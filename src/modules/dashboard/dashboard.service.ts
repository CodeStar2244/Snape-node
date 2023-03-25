import moment from "moment";
import { PAYMENT_STATUS, TIME_STAMP_FORMAT } from "../../config/constants";
import { AppDataSource } from "../../db/db.config"
import { Tblbooking } from "../../entities/Tblbooking"
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class DashboardService{
    public getSummary = async(userDetails)=>{
        try {
       const customDate = moment().subtract(7,"days").format(TIME_STAMP_FORMAT);
       const todayDate = moment().format(TIME_STAMP_FORMAT);
       const bookingRepo = AppDataSource.getRepository(Tblbooking);
       const clients = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere({paymentstatus:PAYMENT_STATUS.SUCESS})
       .andWhere({ bookingstatusid:10})
       .groupBy("clientid,bookings.id")
       .getCount();
       const photoGraphy = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere("(speciality=3 OR speciality=2)")
       .andWhere({paymentstatus:PAYMENT_STATUS.SUCESS})
       .andWhere({ bookingstatusid:10})
       .getCount()
       const videoGraphy = await bookingRepo.createQueryBuilder("bookings")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere("(speciality=3 OR speciality=1)")
       .andWhere({paymentstatus:PAYMENT_STATUS.SUCESS})
       .andWhere({ bookingstatusid:10})
       .getCount()
       const revenue = await bookingRepo.createQueryBuilder("bookings")
       .select('SUM(bookings.totalamount)','totalamount')
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere({paymentstatus:PAYMENT_STATUS.SUCESS})
       .andWhere({ bookingstatusid:10})
       .getRawOne()
       return ResponseBuilder.data({clients,photoGraphy,videoGraphy,revenue:revenue?.totalamount ? revenue.totalamount : 0});
    } catch (error) {
        console.log(error)
            
    }

    }
    public recentCustomers = async(userDetails)=>{
        try {
       const customDate = moment().subtract(7,"days").format(TIME_STAMP_FORMAT);
       const todayDate = moment().format(TIME_STAMP_FORMAT);
       const bookingRepo = AppDataSource.getRepository(Tblbooking);
       const recentCustomers = await bookingRepo.createQueryBuilder("bookings")
       .innerJoinAndSelect("bookings.clientid","clients")
       .select("bookings.startdatetime")
       .addSelect("bookings.enddatetime")
       .addSelect("clients.firstname")
       .addSelect("clients.lastname")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere({ bookingstatusid:10})
       .getMany(); 
       return ResponseBuilder.data({recentCustomers});
    } catch (error) {
        console.log(error)
            
    }

    }
    public upcomingBookings = async(userDetails,date)=>{
        try {
       const startDate = moment(date).startOf('day').format(TIME_STAMP_FORMAT);
       const endDate = moment(date).endOf('day').format(TIME_STAMP_FORMAT);
       const bookingRepo = AppDataSource.getRepository(Tblbooking);
       const recentCustomers = await bookingRepo.createQueryBuilder("bookings")
       .innerJoinAndSelect("bookings.clientid","clients")
       .select("bookings.startdatetime")
       .addSelect("bookings.enddatetime")
       .addSelect("clients.firstname")
       .addSelect("clients.lastname")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."startdatetime" >= '${startDate}'`)
       .andWhere(`"bookings"."startdatetime" <= '${endDate}'`)
       .andWhere({ bookingstatusid:10})
       .getMany(); 
       return ResponseBuilder.data({recentCustomers});
    } catch (error) {
        console.log(error)
            
    }

    }
}