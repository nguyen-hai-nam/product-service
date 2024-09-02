import Router from 'koa-router';

import {
    findManyProducts,
    createOneProduct,
    findOneProduct,
    updateOneProduct,
    deleteOneProduct, activateOneProduct, deactivateOneProduct,
} from '../controllers/product.controller';
import {existProduct, preCreateProduct, preUpdateProduct} from "../middlewares/product.middleware";

const router = new Router();

router.get('/', findManyProducts);
router.post('/', preCreateProduct, createOneProduct);
router.get('/:productId', existProduct, findOneProduct);
router.put('/:productId', existProduct, preUpdateProduct, updateOneProduct);
router.delete('/:productId', existProduct, deleteOneProduct)

router.post('/:productId/activate', existProduct, activateOneProduct);
router.post('/:productId/deactivate', existProduct, deactivateOneProduct);

export default router;
