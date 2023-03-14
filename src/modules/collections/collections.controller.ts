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
    public getCollectionByID = async (req,res)=>{
        try {
            const result = await this.collectionService.getCollectionByID(req.user,req.params.id);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public updateCollection = async (req,res)=>{
        try {
            const result = await this.collectionService.updateCollection(req.params,req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public filesUpload = async (req,res)=>{
        try {
            console.log("helo")
            const result = await this.collectionService.uploadFiles(req.params,req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}