import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { Tblagentmediacategoriesmapping } from "../../entities/Tblagentmediacategoriesmapping";
import { Tblmediacategories } from "../../entities/Tblmediacategories";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AgentGetList } from "./enterpriseAgentsModel";
export class EnterpriseAgentsService {
    public async getAgents(query, userDetails) {
        const queryObj = new AgentGetList(null, query);
        const agentRepo = AppDataSource.getRepository(Tblagent);

        const offset = (+queryObj.page) * +queryObj.limit;
        const limit = queryObj.limit;
        const agentQuery = agentRepo.createQueryBuilder("agent")
            .select("agent.id", "id")
            .addSelect("agent.email", "email")
            .addSelect("agent.latitude", "latitude")
            .addSelect("agent.longitude", "longitude")
            .addSelect(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') as distance`)
            .where("agent.isonline = :isonline", { isonline: true })
            .andWhere(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') < ${queryObj.range}`)
            .offset(offset)
            .limit(limit);


        const agents = await agentQuery.getRawMany();
        const agnetCounts = await agentQuery.getCount();
        const dataToSend = {
            agents,
            total: agnetCounts
        }
        return ResponseBuilder.data(dataToSend)
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
        console.log(agentId , "agentID")
        const agentCategoriesRepo = AppDataSource.getRepository(Tblagentmediacategoriesmapping)
        const mediaCategoriesRepo = AppDataSource.getRepository(Tblmediacategories);
        const agentQuery = agentCategoriesRepo.createQueryBuilder("mediamapping")
            .leftJoin("tblmediacategories","categories","categories.id = mediamapping.mediacategoryid")
            .leftJoin("tblimages","images","categories.id = images.entityid AND entitytype = 'mediacategory'")
            .select("mediamapping.agentId", "id")
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





}