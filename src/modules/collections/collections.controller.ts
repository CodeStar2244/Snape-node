import { CollectionService } from "./collections.service";

export class CollectoinController{
    private collectionService = new CollectionService()
    public createCollection = async (req,res)=>{
        try {
            const result = await this.collectionService.createCollection(req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public getCollections = async (req,res)=>{
        try {
            const result = await this.collectionService.getCollections(req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}