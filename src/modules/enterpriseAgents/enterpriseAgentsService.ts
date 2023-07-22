import { EnterpriseBooking } from "../../entities/enterpriseBooking";
import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Tblagentmediacategoriesmapping } from "../../entities/Tblagentmediacategoriesmapping";
import { Tblbooking } from "../../entities/Tblbooking";
import { Tblmediacategories } from "../../entities/Tblmediacategories";
import { EnterPriseClient } from "../../entities/enterPriseClient";
import EnterpriseAgentFavourite from "../../entities/enterpriseAgentFavourite";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AgentFavourite, AgentGetList, BookAgent } from "./enterpriseAgentsModel";
import { DeepPartial } from "typeorm";
export class EnterpriseAgentsService {
    public async getAgents(query, userDetails) {
        try {
            const queryObj = new AgentGetList(null, query);
        const agentRepo = AppDataSource.getRepository(Tblagent);
        const enterpriseAgentFavouriteRepo = AppDataSource.getRepository(EnterpriseAgentFavourite);

        const offset = (+queryObj.page) * +queryObj.limit;
        const limit = queryObj.limit;
        const favouriteAgents = await enterpriseAgentFavouriteRepo.createQueryBuilder("fav")
        .select("fav.id", "id")
        .addSelect("fav.clientId", "client")
        .addSelect("fav.agentId", "agent")
        .where("fav.clientId = :clientId",{clientId:userDetails.id}).getRawMany();
        const agentsArr = favouriteAgents.map(obj=>obj.agent);
        const agentQuery = agentRepo.createQueryBuilder("agent")
            .leftJoin("tblimages","images","agent.id = images.entityid AND entitytype = 'agent'")
            .select("agent.id", "id")
            .addSelect("agent.firstname", "firstname")
            .addSelect("images.imagepath", "profile")
            .addSelect("agent.email", "email")
            .addSelect("agent.latitude", "latitude")
            .addSelect("agent.longitude", "longitude")
            .addSelect("agent.lastname", "lastname")
            .addSelect("agent.experiencelevel", "experiencelevel")
            .addSelect("agent.speciality", "speciality")
            .addSelect("agent.photograpyrate", "photograpyrate")
            .addSelect("agent.videograpyrate", "videograpyrate")
            .addSelect("agent.bothrate", "bothrate")
            .addSelect("agent.createdondate", "createdAt")
            .addSelect(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') as distance`)
            .where("agent.isonline = :isonline", { isonline: true })
            .andWhere(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') < ${queryObj.range}`)
            .offset(offset)
            .limit(limit);


        const agents = await agentQuery.getRawMany();
        const agnetCounts = await agentQuery.getCount();
        for(const agent of agents){
            if(agentsArr.includes(agent.id)){
                agent.isFavourite = true;
            }else{
                agent.isFavourite = false;
            }
        }
        const dataToSend = {
            agents,
            total: agnetCounts
        }
        return ResponseBuilder.data(dataToSend)
        } catch (error) {
            console.log(error , "Err")
        } 
        
    }
    public async getFavouriteAgentList(query, userDetails) {
        try {
            const queryObj = new AgentGetList(null, query);
        const agentRepo = AppDataSource.getRepository(Tblagent);
        const enterpriseAgentFavouriteRepo = AppDataSource.getRepository(EnterpriseAgentFavourite);
    
        const offset = (+queryObj.page) * +queryObj.limit;
        const limit = queryObj.limit;

        const favouriteAgentsQuery = enterpriseAgentFavouriteRepo.createQueryBuilder("fav")
        .leftJoin("tblagent","agent","fav.agentId = agent.id")
        .leftJoin("tblimages","images","agent.id = images.entityid AND entitytype = 'agent'")
        .select("agent.id", "id")
        .addSelect("agent.firstname", "firstname")
        .addSelect("images.imagepath", "profile")
        .addSelect("agent.email", "email")
        .addSelect("agent.latitude", "latitude")
        .addSelect("agent.longitude", "longitude")
        .addSelect("agent.lastname", "lastname")
        .addSelect("agent.experiencelevel", "experiencelevel")
        .addSelect("agent.speciality", "speciality")
        .addSelect("agent.photograpyrate", "photograpyrate")
        .addSelect("agent.videograpyrate", "videograpyrate")
        .addSelect("agent.bothrate", "bothrate")
        .addSelect("agent.createdondate", "createdAt")
        .where("fav.clientId = :clientId ",{clientId :userDetails.id})
        .offset(offset)
        .limit(limit);

        const agents = await favouriteAgentsQuery.getRawMany();
        const agnetCounts = await favouriteAgentsQuery.getCount();
        const dataToSend = {
            agents,
            total: agnetCounts
        }
        return ResponseBuilder.data(dataToSend)
        } catch (error) {
            console.log(error , "Err")
        } 
        
    }
    public async bookAgentRequest(body:BookAgent,params, userDetails) {
        try {
            const agentId = params.id;
            const enterpriseClientRepo = AppDataSource.getRepository(EnterPriseClient);
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const enterpriseBookingRepo = AppDataSource.getRepository(EnterpriseBooking);
            const agent = await agentRepo.findOne({where:{id:agentId}});
            if(!agent){
                return ResponseBuilder.badRequest("Agent Not found")
            }
            const enterpriseClient = await enterpriseClientRepo.findOne({where:{
                id:userDetails.id
            }});
            const enterpriseBooking = enterpriseBookingRepo.create({
                bookingDate:body.bookingDate,
                bookingStartDateTime:body.bookingStartDateTime,
                bookingEndDateTime:body.bookingEndDateTime,
                bookingstatusid:0,
                address1:body.address1,
                address2:body.address2,
                agentId:agent,
                clientId:enterpriseClient,
                hours:body.hours,
                latitude:body.latitude,
                speciality:body.speciality,
                longitude:body.longitude
            });
            const created = await enterpriseBookingRepo.save(enterpriseBooking);    
            return ResponseBuilder.data(created);
        } catch (error) {
            console.log(error , "Err")
        } 
        
    }
    public async getAgentLocations(query, userDetails) {
        const queryObj = new AgentGetList(null, query);
        const agentRepo = AppDataSource.getRepository(Tblagent);
        const agentQuery = agentRepo.createQueryBuilder("agent")
            .select("agent.id", "id")
            .addSelect("agent.firstname", "firstname")
            .addSelect("agent.latitude", "latitude")
            .addSelect("agent.longitude", "longitude")
            .addSelect(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') as distance`)
            .where("agent.isonline = :isonline", { isonline: true })
            .andWhere(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') < ${queryObj.range}`)


        const agents = await agentQuery.getRawMany();
        const dataToSend = {
            agents
        }
        return ResponseBuilder.data(dataToSend)
    }
    public async getAgentDetails(params, userDetails) {
        try {
            const { agentId } = params;
        const agentRepo = AppDataSource.getRepository(Tblagent);
        const agentQuery = agentRepo.createQueryBuilder("agent")
            .leftJoin("tblimages","images","agent.id = images.entityid AND entitytype = 'agent'")
            .select("agent.id", "id")
            .addSelect("agent.firstname", "firstname")
            .addSelect("images.imagepath", "profile")
            .addSelect("agent.lastname", "lastname")
            .addSelect("agent.experiencelevel", "experiencelevel")
            .addSelect("agent.speciality", "speciality")
            .addSelect("agent.photograpyrate", "photograpyrate")
            .addSelect("agent.videograpyrate", "videograpyrate")
            .addSelect("agent.bothrate", "bothrate")
            .addSelect("agent.createdondate", "createdAt")
            .where("agent.id = :agentId", { agentId })


        const agent = await agentQuery.getRawOne();
        const dataToSend = {
            agent
        }
        return ResponseBuilder.data(dataToSend)
            
        } catch (error) {
            console.log(error , "Er")
            
        }
        
    }
    public async getAgentCategories(params, userDetails) {
        try{
        const { agentId } = params;
        const agentCategoriesRepo = AppDataSource.getRepository(Tblagentmediacategoriesmapping)
        const mediaCategoriesRepo = AppDataSource.getRepository(Tblmediacategories);
        const agentQuery = agentCategoriesRepo.createQueryBuilder("mediamapping")
            .leftJoin("tblmediacategories","categories","categories.id = mediamapping.mediacategoryid")
            .leftJoin("tblimages","images","categories.id = images.entityid AND entitytype = 'mediacategory'")
            .select("mediamapping.agentId", "id")
            .addSelect("images.imagepath","image")
            .addSelect("categories.title")
            .where("mediamapping.agentId = :agentId", { agentId });
        const agent = await agentQuery.getRawMany();
        const dataToSend = {
            agent
        }
        return ResponseBuilder.data(dataToSend)}
        catch(error){
            console.log(error , "Err")

        }
    }
    public async getAgentReviews(params, userDetails) {
        try{
        const { agentId } = params;
        const bookingRepo = AppDataSource.getRepository(Tblbooking);
        const agentRepo = AppDataSource.getRepository(Tblagent);
        const agent = await agentRepo.findOne({where:{id:agentId}});
        if(!agent){
            return ResponseBuilder.badRequest("Agent not exists")
        }
        const bookings = await bookingRepo.createQueryBuilder("b")
        .leftJoin("tblimages","images","b.clientId = images.entityid AND entitytype = 'client'")
        .leftJoin("tblclient","client","b.clientId = client.id")
        .select("b.id","id")
        .addSelect("client.firstname","firstname")
        .addSelect("client.lastname","lastname")
        .addSelect("images.imagepath","profile")
        .addSelect("b.head","title")
        .addSelect("b.message","description")
        .addSelect("b.agentrating","rating")
        .where("b.agentId = :agentId",{agentId})
        .andWhere("b.bookingstatusid = 10")
        .getRawMany();
       
        return ResponseBuilder.data({bookings})
    }
        catch(error){
            console.log(error , "Err")

        }
    }
    public async addRemoveFavourite(params:AgentFavourite, userDetails,agentId) {
        try{
            const agentRepo = AppDataSource.getRepository(Tblagent);
            const enterpriseRepo = AppDataSource.getRepository(EnterPriseClient);
            const enterpriseAgentFavouriteRepo = AppDataSource.getRepository(EnterpriseAgentFavourite)
            const agent = await agentRepo.findOne({where:{id:agentId}});
            const enterpriseClient = await enterpriseRepo.findOne({where:{id:userDetails.id}});
            const enterpriseAgentFavourite = await enterpriseAgentFavouriteRepo.findOne({
                where:{
                    clientId:{
                        id:enterpriseClient.id
                    },
                    agentId:{
                        id:agent.id
                    }
                }
            })
           if(params.isFavourite === '0'){
            if(enterpriseAgentFavourite){
                enterpriseAgentFavouriteRepo.remove(enterpriseAgentFavourite);
            }
            return ResponseBuilder.data({message:'Favourite Removed'})

           }else{
            if(enterpriseAgentFavourite){
                return ResponseBuilder.data({message:'Favourite Added Already'})
            }else{
                const enterpriseAgentFavouriteEntry = enterpriseAgentFavouriteRepo.create({
                    clientId:enterpriseClient,
                    agentId:agent
                })
                enterpriseAgentFavouriteRepo.save(enterpriseAgentFavouriteEntry);
            }
            
            
            return ResponseBuilder.data({message:'Favourite Added'})

           }


        }
        catch(error){
            console.log(error , "Err")

        }
    }





}