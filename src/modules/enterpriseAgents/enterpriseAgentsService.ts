import { AppDataSource } from "../../db/db.config";
import { Tblagent } from "../../entities/Tblagent";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AgentGetList } from "./enterpriseAgentsModel";
export class EnterpriseAgentsService {
    public async getAgents(query , userDetails){
        const queryObj = new AgentGetList(null,query);
        const agentRepo = AppDataSource.getRepository(Tblagent);

        const offset = (+queryObj.page) * +queryObj.limit;
        const limit = queryObj.limit;
        const agentQuery =  agentRepo.createQueryBuilder("agent")
       .select("agent.id","id")
       .addSelect("agent.email","email")
       .addSelect("agent.latitude","latitude")
       .addSelect("agent.longitude","longitude")
       .addSelect(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') as distance`)
       .where("agent.isonline = :isonline",{isonline:true})
       .andWhere(`calculate_distance(agent.latitude , agent.longitude,${queryObj.latitude} ,${queryObj.longitude},'K') < ${queryObj.range}`)
       .offset(offset)
       .limit(limit);
       
       
       const agents = await agentQuery.getRawMany();
       const agnetCounts = await agentQuery.getCount();
       const dataToSend = {
        agents,
        total:agnetCounts
       }
       return ResponseBuilder.data(dataToSend)
    }
    
    
   

}