import { AppDataSource } from "../../db/db.config";
import StudioClient from "../../entities/studioClient";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { StudioSpeciality } from "../../entities/studioSpeciality";
import { CDN_URL, FILE_ALREADY_EXISTS, FRONT_URL } from "../../config/constants";

export class StudioManagementService {
    public createClient = async (userDetails, body) => {
        try {
            const studioClientRepository = AppDataSource.getRepository(StudioClient);
            let params={...body,createdBy: userDetails.id}
            if(body.profileUrl){
                params={...params,profileUrl:CDN_URL+body.profileUrl}
            }
            const studioClient = await studioClientRepository.save(params)

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
                .select("studioclient.id", "id")
                .addSelect("studioclient.name", "name")
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


    editClient = async (params, body,userDetails) => {
      try {
          if(body.profileUrl){
              body={...body,profileUrl:CDN_URL+body.profileUrl}
          }
        await AppDataSource
          .getRepository(StudioClient)
          .createQueryBuilder()
          .update(StudioClient)
          .set(body)
          .where("id = :id", { id: params.id })
          .execute();
  
          const specialityRepository = await AppDataSource
          .getRepository(StudioClient)
          .createQueryBuilder("faq")
          .where("faq.id = :id", { id: params.id })
          .getOne();
  
        return ResponseBuilder.data({ message: "Client edit successfully", data: specialityRepository });
      } catch (error) {
        console.log(error);
        return ResponseBuilder.badRequest(error?.message)
      }
    };

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
          params.createdBy = user.id;
          const specialityRepository = AppDataSource.getRepository(StudioSpeciality);
            if(params.imageUrl){
                params={...params,imageUrl:CDN_URL+params.imageUrl}
            }
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
                .loadRelationIdAndMap("agentId", "studioclient.createdBy").getRawMany();

          return ResponseBuilder.data({ data: { specialityDetails: query } });
        } catch (error) {
          console.log(error);
          return ResponseBuilder.badRequest(error?.message)
        }
      };
      editSpeciality = async (params, body): Promise<any> => {
        try {
            if(body.imageUrl){
                body={...params,imageUrl:CDN_URL+body.imageUrl}
            }
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