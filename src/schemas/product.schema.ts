import {z} from 'zod';

const ProductStatusDto = z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "RESTOCKING", "DELETED"]);

export const ProductDto = z.object({
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
    status: ProductStatusDto.default("ACTIVE"),
    brand: z.string().optional(),
    colors: z.array(z.string()).optional(),
    dynamicAttributes: z.object({
        keys: z.array(z.string()).default([]),
    }).optional(),
});

export const CreateProductDto = z.object({
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
    status: ProductStatusDto.default("ACTIVE"),
    brand: z.string().optional(),
    colors: z.array(z.string()).optional(),
    dynamicAttributes: z.record(z.string(), z.any()).optional(),
});

export const UpdateProductDto = CreateProductDto.partial();


export type ProductDtoType = z.infer<typeof ProductDto>;
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;