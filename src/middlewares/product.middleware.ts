import { Context, Next } from 'koa';

import Product from "../models/product.model";
import {productResponseMessage} from "../singleton/product.singleton";
import {CreateProductBodySchema, UpdateProductBodySchema} from "../schemas/product.schema";
import {ResponseEntity} from "../utils/entities/response.entity";
import {Types} from "mongoose";

const existProduct = async (ctx: Context, next: Next) => {
    try {
        const {productId} = ctx.params;
        if (!Types.ObjectId.isValid(productId)) {
            ctx.status = 400;
            ctx.body = ResponseEntity.error("Invalid params");
            return;
        }
        const product = await Product.findById(productId);
        if (!product) {
            ctx.status = 404;
            ctx.body = ResponseEntity.error(productResponseMessage.notFoundMessage());
            return;
        }
        await next();
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.internalErrorMessage());
    }
}

const preCreateProduct = async (ctx: Context, next: Next) => {
    const parseResult = await CreateProductBodySchema.safeParseAsync(ctx.request.body);
    if (!parseResult.success) {
        ctx.status = 400;
        ctx.body = ResponseEntity.error(parseResult.error.issues);
        return;
    }
    await next();
};

const preUpdateProduct = async (ctx: Context, next: Next) => {
    const parseResult = await UpdateProductBodySchema.safeParseAsync(ctx.request.body);
    if (!parseResult.success) {
        ctx.status = 400;
        ctx.body = ResponseEntity.error(parseResult.error.issues);
        return;
    }
    ctx.request.body = parseResult.data;
    await next();
};

export {
    existProduct,
    preCreateProduct,
    preUpdateProduct,
}