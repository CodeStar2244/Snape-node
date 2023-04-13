import { ResponseBuilder } from "../../helpers/responseBuilder";
export class AssetRegistryService {
    public createAsset = async (body,userDetails) => {
        try {
           return ResponseBuilder.data({})
        }  catch (error) {
            console.log(error)
            throw ResponseBuilder.error(error)

        }
    }
    
   

}