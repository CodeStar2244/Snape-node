import { AppDataSource } from "../../db/db.config";
import StudioClient from "../../entities/studioClient";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { StudioSpeciality } from "../../entities/studioSpeciality";
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
                .addSelect("studioclient.profileUrl", "profileUrl")
                .addSelect("studioclient.createdAt", "createdAt")
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



    addSpeciality = async (params: any, user: any): Promise<any> => {
        try {
          params.agentId = user.id;
          const specialityRepository = AppDataSource.getRepository(StudioSpeciality);
          const createUser = specialityRepository.create(params);
          const data = await specialityRepository.save(createUser);
          return ResponseBuilder.data({
            data,
            message: "Speciality added successfully",
          });
        } catch (error) {
          console.log(error);
          return ResponseBuilder.badRequest(error?.message)
        }
      };
    
      getSpeciality = async ( user: any): Promise<any> => {
        try {
          const specialityRepository = AppDataSource.getRepository(StudioSpeciality);

          const query = await specialityRepository.createQueryBuilder("studioclient")
                .select("studioclient.id", "id")
                .addSelect("studioclient.name", "name")
                .addSelect("studioclient.imageUrl", "imageUrl")
                .addSelect("studioclient.createdAt", "createdAt")
                .where("studioclient.createdBy = :agentId", { agentId: user.id })
                .loadRelationIdAndMap("agentId", "studioclient.createdBy")

          return ResponseBuilder.data({ data: { specialityDetails: query } });
        } catch (error) {
          console.log(error);
          return ResponseBuilder.badRequest(error?.message)
        }
      };
      editSpeciality = async (params, body): Promise<any> => {
        try {
          await AppDataSource
            .getRepository(StudioSpeciality)
            .createQueryBuilder()
            .update(StudioSpeciality)
            .set(body)
            .where("id = :id", { id: params.id })
            .execute();
    
          const specialityRepository = await AppDataSource
            .getRepository(StudioSpeciality)
            .createQueryBuilder("faq")
            .where("faq.id = :id", { id: params.id })
            .getOne();
    
          return ResponseBuilder.data({ message: "Speciality edit successfully", data: specialityRepository });
        } catch (error) {
          console.log(error);
          return ResponseBuilder.badRequest(error?.message)
        }
      };
    
      deleteSpeciality = async (params): Promise<any> => {
        try {
          const userRepository = AppDataSource.getRepository(StudioSpeciality);
          await userRepository.delete({ id: params.id });
          return ResponseBuilder.data({ message: "Faq deleted successfully" });
        } catch (error) {
          console.log(error);
          return ResponseBuilder.badRequest(error?.message)
        }
      };


}