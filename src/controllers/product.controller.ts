import {Context} from 'koa';

import Product from "../models/product.model";
import {ResponseEntity} from "../utils/entities/response.entity";
import {
    ProductQuerySchema,
    CreateProductBodySchemaType,
    UpdateProductBodySchemaType
} from "../schemas/product.schema";
import {ProductMapper} from "../mappers/product.mapper";
import {productResponseMessage} from "../singleton/product.singleton";
import {parseSortString} from "../utils/sort-parser";


const findManyProducts = async (ctx: Context) => {
    const rawQuery = ctx.query;

    const parseResult = await ProductQuerySchema.safeParseAsync(rawQuery);

    if (!parseResult.success) {
        ctx.status = 400;
        ctx.body = ResponseEntity.error(parseResult.error.errors);
        return;
    }

    const parsedQuery = parseResult.data;

    const mongooseQuery: any = {};

    if (parsedQuery.search) {
        mongooseQuery.$text = {$search: parsedQuery.search};
    }

    if (parsedQuery.categories) {
        mongooseQuery.categories = { $in: [...parsedQuery.categories] };
    }

    const mongooseSort: any = {};

    if (parsedQuery.sort) {
        if (parsedQuery.sort.price) mongooseSort.price = parseSortString(parsedQuery.sort.price);
        if (parsedQuery.sort.status) mongooseSort.status = parseSortString(parsedQuery.sort.status);
        if (parsedQuery.sort.createdAt) mongooseSort.createdAt = parseSortString(parsedQuery.sort.createdAt);
        if (parsedQuery.sort.updatedAt) mongooseSort.updatedAt = parseSortString(parsedQuery.sort.updatedAt);
    }
    try {
        console.log(mongooseQuery, mongooseSort)
        const products = await Product.find(mongooseQuery).sort(mongooseSort);
        ctx.body = ResponseEntity.ok(productResponseMessage.findManyMessage(), products);
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.findManyMessage(false));
    }
}

const createOneProduct = async (ctx: Context) => {
    try {
        const productModel = ProductMapper.createDtoToModel(ctx.request.body as CreateProductBodySchemaType);
        const createdProduct = await Product.create(productModel);
        ctx.body = ResponseEntity.ok(productResponseMessage.createMessage(), ProductMapper.modelToDto(createdProduct));
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.createMessage(false));
    }
}

const findOneProduct = async (ctx: Context) => {
    const productId = ctx.params.productId;


    try {
        const product = await Product.findById(productId);
        if (!product) {
            ctx.status = 404;
            ctx.body = ResponseEntity.error(productResponseMessage.notFoundMessage());
            return;
        }
        ctx.body = ResponseEntity.ok(productResponseMessage.findOneMessage(), product);
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.findOneMessage(false));
    }
}

const updateOneProduct = async (ctx: Context) => {
    try {
        const updatingProductModel = ProductMapper.updateDtoToModel(ctx.request.body as UpdateProductBodySchemaType);
        await Product.updateOne({_id: ctx.params.productId}, updatingProductModel);
        ctx.body = ResponseEntity.ok(productResponseMessage.updateMessage());
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.updateMessage(false));
    }
}

const deleteOneProduct = async (ctx: Context) => {
    const product = await Product.findById(ctx.params.productId);
    if (!product) {
        ctx.status = 404;
        ctx.body = ResponseEntity.error(productResponseMessage.notFoundMessage());
        return;
    }
    try {
        await Product.deleteOne({_id: ctx.params.productId});
        ctx.body = ResponseEntity.ok(productResponseMessage.deleteMessage());
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.deleteMessage(false));
    }
}

const activateOneProduct = async (ctx: Context) => {
    try {
        await Product.updateOne({_id: ctx.params.productId}, {status: "ACTIVATE"});
        ctx.body = ResponseEntity.ok(productResponseMessage.updateMessage());
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.updateMessage(false));
    }
}

const deactivateOneProduct = async (ctx: Context) => {
    try {
        await Product.updateOne({_id: ctx.params.productId}, {status: "INACTIVE"});
        ctx.body = ResponseEntity.ok(productResponseMessage.updateMessage());
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.updateMessage(false));
    }
}

export {
    findManyProducts,
    createOneProduct,
    findOneProduct,
    updateOneProduct,
    deleteOneProduct,
    activateOneProduct,
    deactivateOneProduct,
};