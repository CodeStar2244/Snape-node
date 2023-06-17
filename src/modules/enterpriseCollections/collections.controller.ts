import { Request, Response } from "express";
import { CollectionService } from "./collections.service";

export class EnterpriseCollectoinController{
    private collectionService = new CollectionService()
    public createCollection = async (req,res)=>{
        try {
            const result = await this.collectionService.createCollection(req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public getCollections = async (req:any,res)=>{
        try {
            const {search,order,sort} = req.query;
            const result = await this.collectionService.getCollections(req.user,search,order,sort);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public listThemes = async (req:any,res)=>{
        try {
            const result = await this.collectionService.listThemes();
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
    public getCollectionDesign = async (req,res)=>{
        try {
            
            const result = await this.collectionService.getCollectionDesign(req.user,req.params.id);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public getCollectionFiles = async (req,res)=>{
        try {
            const {search,sort,order} = req.query;
            const result = await this.collectionService.getCollectionFiles(req.user,req.params.id,search,sort,order);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public getCollectionFilesName = async (req,res)=>{
        try {
            const result = await this.collectionService.getCollectionFilesName(req.user,req.params.id);
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
    public collectionDesign = async (req,res)=>{
        try {
            const result = await this.collectionService.collectionDesign(req.params,req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public changeCoverPhoto = async (req,res)=>{
        try {
            const result = await this.collectionService.changeCoverPhoto(req.params,req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public deleteCollection = async (req,res)=>{
        try {
            const result = await this.collectionService.deleteCollection(req.user,req.params.id);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public deleteFiles = async (req,res)=>{
        try {
            const {ids} = req.body;
            const result = await this.collectionService.deleteFiles(req.user,req.params.id,ids);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public filesUpload = async (req,res)=>{
        try {
            const result = await this.collectionService.uploadFiles(req.params,req.body,req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
}