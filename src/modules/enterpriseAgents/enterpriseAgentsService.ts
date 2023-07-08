import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Tblagentmediacategoriesmapping } from "../../entities/Tblagentmediacategoriesmapping";
import { Tblmediacategories } from "../../entities/Tblmediacategories";
import { EnterPriseClient } from "../../entities/enterPriseClient";
import EnterpriseAgentFavourite from "../../entities/enterpriseAgentFavourite";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AgentFavourite, AgentGetList } from "./enterpriseAgentsModel";
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
            .select("agent.id", "id")
            .addSelect("agent.firstname", "firstname")
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