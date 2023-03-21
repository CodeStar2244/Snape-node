import { DashboardService } from "./dashboard.service";

export class DashboardController{
    private dashboardService = new DashboardService()
    public getSummary = async (req,res)=>{
        try {
            const result = await this.dashboardService.getSummary(req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }
    public recentCustomers = async (req,res)=>{
        try {
            const result = await this.dashboardService.recentCustomers(req.user);
            return res.status(result.code).json(result);
            
        } catch (error) {
            return res.status(error.code).json(error);        
        }
    }

}