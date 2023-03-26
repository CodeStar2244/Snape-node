import moment from "moment";
import { PAYMENT_STATUS, TIME_STAMP_FORMAT } from "../../config/constants";
import { AppDataSource } from "../../db/db.config"
import { Tblbooking } from "../../entities/Tblbooking"
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class DashboardService{
    public getSummary = async(userDetails)=>{
        try {
       const customDate = moment().subtract(7,"days").format(TIME_STAMP_FORMAT);
       const todayDate = moment().endOf('day').format(TIME_STAMP_FORMAT);
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
       const todayDate = moment().endOf("day").format(TIME_STAMP_FORMAT);
       const bookingRepo = AppDataSource.getRepository(Tblbooking);
       const recentCustomers = await bookingRepo.createQueryBuilder("bookings")
       .innerJoinAndSelect("bookings.clientid","clients")
       .innerJoin("tblimages","images","bookings.clientid = images.entityid AND entitytype = 'client'")
       .select("bookings.startdatetime","bookingStartTime")
       .addSelect("bookings.enddatetime",'bookingEndTime')
       .addSelect("bookings.session",'session')
       .addSelect("clients.firstname","clientfirstName")
       .addSelect("clients.lastname","clientLastName")
       .addSelect("images.imagepath","profile")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."enddatetime" >= '${customDate}'`)
       .andWhere(`"bookings"."enddatetime" <= '${todayDate}'`)
       .andWhere({ bookingstatusid:10})
       .getRawMany(); 
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
       .innerJoin("tblimages","images","bookings.clientid = images.entityid AND entitytype = 'client'")
       .select("bookings.startdatetime","bookingStartTime")
       .addSelect("bookings.id",'id')
       .addSelect("bookings.enddatetime",'bookingEndTime')
       .addSelect("bookings.session",'session')
       .addSelect("clients.firstname","clientfirstName")
       .addSelect("clients.lastname","clientLastName")
       .addSelect("bookings.address1","address1")
       .addSelect("bookings.address2","address2")
       .addSelect("bookings.latitude","latitude")
       .addSelect("bookings.longitude","longitude")
       .addSelect("bookings.totalamount","totalamount")
       .addSelect("images.imagepath","profile")
       .where({agentid:userDetails.id})
       .andWhere(`"bookings"."startdatetime" >= '${startDate}'`)
       .andWhere(`"bookings"."startdatetime" <= '${endDate}'`)
       .andWhere({ bookingstatusid:3})
       .getRawMany(); 
       return ResponseBuilder.data({recentCustomers});
    } catch (error) {
        console.log(error)
            
    }

    }
}