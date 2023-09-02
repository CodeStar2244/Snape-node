import { ResponseBuilder } from "../../helpers/responseBuilder";

export class BillingService {
  public initiateTransaction = async (userDetails, body) => {
    try {
      return ResponseBuilder.data({});
    } catch (error) {
      throw ResponseBuilder.error(error);
    }
  };
}
