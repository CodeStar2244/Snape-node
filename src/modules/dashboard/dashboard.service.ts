import { PAYMENT_STATUS } from "../../config/constants";
import { AppDataSource } from "../../db/db.config"
import { Tblbooking } from "../../entities/Tblbooking"
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class DashboardService{
    public getSummary = async(userDetails)=>{
        try {
       const bookingRepo = AppDataSource.getRepository(Tblbooking);
       const clients = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .groupBy("clientid,bookings.id")
       .getCount();
       const photoGraphy = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .andWhere("(speciality=3 OR speciality=2)")
       .getCount()
       const videoGraphy = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .andWhere("(speciality=3 OR speciality=1)")
       .getCount()
       const revenue = await bookingRepo.createQueryBuilder("bookings")
       .select('SUM(bookings.totalamount)','totalamount')
       .where({agentid:userDetails.id})
       .andWhere({paymentstatus:PAYMENT_STATUS.SUCESS})
       .getRawOne()
       return ResponseBuilder.data({clients,photoGraphy,videoGraphy,revenue:revenue?.totalamount});
    } catch (error) {
        console.log(error)
            
    }

    }
}