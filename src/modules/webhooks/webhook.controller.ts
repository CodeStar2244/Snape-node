import { WebhookService } from "./webhook.service";

export class WebhookController {
  private webhookService = new WebhookService();
  public acceptTransaction = async (req, res) => {
    try {
      const data = await this.webhookService.acceptTransaction(req.body);
      return res.status(data.code).json(data);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  };
}
