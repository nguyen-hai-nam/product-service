import mongoose, { Schema } from 'mongoose';

export interface IProduct {
    _id?: string;
    title: string;
    description: string;
    categories: string[];
    images: string[];
    price: number;
    comparedPrice: number;
    originalPrice: number;
    stockQuantity: number;
    includeVAT: boolean;
    status: string;
    note?: string;
    brand?: string;
    colors?: string[];
    dynamicAttributes?: any;
}

const productSchema = new Schema({
    title: String,
    description: String,
    categories: [String],
    images: [String],
    note: String,
    price: Number,
    comparedPrice: Number,
    originalPrice: Number,
    stockQuantity: Number,
    includeVAT: Boolean,
    status: String,
    brand: String,
    colors: [String],
    dynamicAttributes: Schema.Types.Mixed,
}, {
    timestamps: true,
});

productSchema.index({ title: 'text', brand: 'text', description: 'text' }, { weights: { title: 5, brand: 2, description: 1 } });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;