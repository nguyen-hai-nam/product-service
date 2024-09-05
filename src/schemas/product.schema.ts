import {z} from 'zod';

import {jsonStringToObject} from "../shared/schemas/json-to-object";

const productStatusSchema = z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "RESTOCKING", "DELETED"]);

export const ProductSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    images: z.array(z.string()),
    note: z.string().optional(),
    price: z.number().positive(),
    comparedPrice: z.number().positive(),
    originalPrice: z.number().positive(),
    stockQuantity: z.number().nonnegative().default(0),
    includeVAT: z.boolean().default(false),
    status: productStatusSchema.default("ACTIVE"),
    brand: z.string().optional(),
    colors: z.array(z.string()).optional(),
    dynamicAttributes: z.object({
        keys: z.array(z.string()).default([]),
    }).optional(),
});

export const ProductQuerySchema = z.object({
    search: z.string().optional(),
    categories: jsonStringToObject.pipe(z.array(z.string())).optional(),
    sort: jsonStringToObject.pipe(z.object({
        price: z.enum(["asc", "desc"]).optional(),
        status: z.enum(["asc", "desc"]).optional(),
        createdAt: z.enum(["asc", "desc"]).optional(),
        updatedAt: z.enum(["asc", "desc"]).optional(),
    })).optional(),
});

export const CreateProductBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    note: z.string().optional(),
    comparedPrice: z.number().positive(),
    originalPrice: z.number().positive(),
    categories: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    stockQuantity: z.number().nonnegative().default(0),
    includeVAT: z.boolean().default(false),
    status: productStatusSchema.default("ACTIVE"),
    brand: z.string().optional(),
    colors: z.array(z.string()).optional(),
    dynamicAttributes: z.record(z.string(), z.any()).optional(),
});

export const UpdateProductBodySchema = CreateProductBodySchema.partial();

export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type CreateProductBodySchemaType = z.infer<typeof CreateProductBodySchema>;
export type UpdateProductBodySchemaType = z.infer<typeof UpdateProductBodySchema>;