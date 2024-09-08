import {Context, Next} from "koa";

const cors = async (ctx: Context, next: Next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
};

export default cors;