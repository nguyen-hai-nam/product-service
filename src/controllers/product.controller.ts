import {Context} from 'koa';

import Product from "../models/product.model";
import {ResponseEntity} from "../utils/entities/response.entity";
import {
    CreateProductDtoType,
    UpdateProductDtoType
} from "../schemas/product.schema";
import {ProductMapper} from "../mappers/product.mapper";
import {productResponseMessage} from "../singleton/product.singleton";


const findManyProducts = async (ctx: Context) => {
    const {search, sort, category} = ctx.query;

    const query: any = {};

    if (search) {
        query.$or = [{name: {$regex: search, $options: 'i'}}, {description: {$regex: search, $options: 'i'}}];
    }

    if (category) {
        query.category = category;
    }

    let sortOption: any = {};
    if (sort === 'price_asc') {
        sortOption.price = 1;
    } else if (sort === 'price_desc') {
        sortOption.price = -1;
    }
    try {
        const products = await Product.find(query).sort(sortOption);
        ctx.body = ResponseEntity.ok(productResponseMessage.findManyMessage(), products);
    } catch (e) {
        ctx.status = 500;
        ctx.body = ResponseEntity.error(productResponseMessage.findManyMessage(false));
    }
}

const createOneProduct = async (ctx: Context) => {
    try {
        const productModel = ProductMapper.createDtoToModel(ctx.request.body as CreateProductDtoType);
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
        const updatingProductModel = ProductMapper.updateDtoToModel(ctx.request.body as UpdateProductDtoType);
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