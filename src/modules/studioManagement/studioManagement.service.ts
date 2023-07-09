import { AppDataSource } from "../../db/db.config";
import StudioClient from "../../entities/studioClient";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class StudioManagementService {
    public createClient = async (userDetails, body) => {
        try {
            const studioClientRepository = AppDataSource.getRepository(StudioClient);
            const studioClient = await studioClientRepository.save({
                ...body, createdBy: userDetails.id
            })
            console.log(userDetails, '----userDetails-----');

            return ResponseBuilder.data(studioClient, "Studio Client created SuccessFully");

        } catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }

    public getClient = async (userDetails, search) => {
        try {
            const studioClientRepository = AppDataSource.getRepository(StudioClient);
            const query = await studioClientRepository.createQueryBuilder("studioclient")
                .select("studioclient.name", "name")
                .addSelect("studioclient.email", "email")
                .addSelect("studioclient.phone", "phone")
                .where("studioclient.createdBy = :agentId", { agentId: userDetails.id })
                .loadRelationIdAndMap("agentId", "studioclient.createdBy")
            if (search) {
                query.andWhere('studioclient.name ILIKE :name', { name: `%${search}%` })
                query.andWhere('studioclient.email ILIKE :name', { name: `%${search}%` })
            }
            const studioclient = await query.getRawMany();
            return ResponseBuilder.data(studioclient);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }
    }

    public getClientDetails = async (userDetails, clientId: number) => {
        try {
            const studioClientRepository = AppDataSource.getRepository(StudioClient);
            const studioclient = await studioClientRepository.findOne({
                where:{
                    id: clientId, createdBy: userDetails.id
                }
            })
            return ResponseBuilder.data(studioclient);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }
    }

    public deleteClient = async (userDetails, clientId: number) => {
        try {
            const studioClientRepository = AppDataSource.getRepository(StudioClient);
            const studioClient = await studioClientRepository.findOne({
                where:{
                    id: clientId, createdBy: userDetails.id
                }
            })
            if (!studioClient) {
                return ResponseBuilder.badRequest("Client Not Found", 404);
            }
            await studioClientRepository.delete({ id: clientId });
            return ResponseBuilder.data(studioClient);

        } catch (error) {
            throw ResponseBuilder.error(error)

        }
    }

}