import Koa from 'koa';
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import logger from 'koa-logger';

import connectDB from "./config/db";
import cors from "./config/cors";
import {PORT} from "./config/environments";
import productRoutes from './routes/product.route';



const app = new Koa();
const router = new Router();

app.use(cors);
app.use(logger());
app.use(bodyParser());

router.use('/api/products', productRoutes.routes());
app.use(router.routes()).use(router.allowedMethods());

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
