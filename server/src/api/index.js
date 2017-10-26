import { version } from '../../package.json';
import { Router } from 'express';
import * as products from './products';

export default ({ config, db }) => {
	let api = Router();

	api.get('/products', products.getProductFormData);
	api.get('/pricingrule', products.getPricingRule);

	return api;
}
