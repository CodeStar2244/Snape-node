import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/', (req: Request, res: Response) => {
    console.log("Ganpati Bappa Morya - First server start...");
});

app.listen(process.env?.PORT || 3000, () => {
    console.log("Ganpati Bappa Morya - First server start");
});