import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import path from 'path';
import "./services/post/PostPublishScheduler";
import cron from "node-cron";
import { StartMarketingPublicationScheduler } from './services/marketing_publication/StartMarketingPublicationScheduler';
import { EndMarketingPublicationScheduler } from './services/marketing_publication/EndMarketingPublicationScheduler';
const startScheduler = new StartMarketingPublicationScheduler();
const endScheduler = new EndMarketingPublicationScheduler();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'images'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(process.env.PORT || 3333, () => console.log('Servidor online!!!!'));

cron.schedule("* * * * *", async () => {
    await startScheduler.execute();

    setTimeout(async () => {
        await endScheduler.execute();
    }, 10000);
});