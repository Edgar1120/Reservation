import cors from 'cors';
import express from 'express'
import config from './config'

import serviceRoutes from './routes/service.routes'

const app = express();

app.set('port', config.port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(serviceRoutes);

export default app