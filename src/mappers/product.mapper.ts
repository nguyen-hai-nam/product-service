import {IProduct} from "../models/product.model";
import {CreateProductBodySchemaType, ProductSchemaType, UpdateProductBodySchemaType} from "../schemas/product.schema";

export class ProductMapper {
    static createDtoToModel(data: CreateProductBodySchemaType): IProduct {
        return {
            title: data.title,
            description: data.description,
            categories: data.categories,
            images: data.images,
            price: data.price,
            comparedPrice: data.comparedPrice,
            originalPrice: data.originalPrice,
            stockQuantity: data.stockQuantity,
            includeVAT: data.includeVAT,
            status: data.status,
            note: data.note,
            brand: data.brand,
            colors: data.colors,
            dynamicAttributes: data.dynamicAttributes,
        }
    }

    static updateDtoToModel(data: UpdateProductBodySchemaType): Partial<IProduct> {
        return {
            title: data.title,
            description: data.description,
            categories: data.categories,
            images: data.images,
            price: data.price,
            comparedPrice: data.comparedPrice,
            originalPrice: data.originalPrice,
            stockQuantity: data.stockQuantity,
            includeVAT: data.includeVAT,
            status: data.status,
            note: data.note,
            brand: data.brand,
            colors: data.colors,
            dynamicAttributes: data.dynamicAttributes,
        }
    }

    static modelToDto(data: IProduct): ProductSchemaType {
        return {
            id: data._id,
            title: data.title,
            description: data.description,
            price: data.price,
            comparedPrice: data.comparedPrice,
            originalPrice: data.originalPrice,
            categories: data.categories,
            images: data.images,
            stockQuantity: data.stockQuantity,
            status: data.status as any,
            includeVAT: data.includeVAT,
            brand: data.brand,
            colors: data.colors,
            note: data.note,
            dynamicAttributes: data.dynamicAttributes,
        }
    }
}