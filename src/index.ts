import App from './server';
import * as http from 'http';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);

httpServer.listen(PORT, () => {
    console.log("Pipeline Got Sucess. Ganpati Bappa Morya");
});
