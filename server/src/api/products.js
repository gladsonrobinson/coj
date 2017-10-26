
import products from '../mock/products';
import pricingRule from '../mock/pricing-rule';
export function getProductFormData(req, res) {
  return res.status(200).json(products);
}

export function getPricingRule(req, res) {
  return res.status(200).json(pricingRule);
}

function responceWithResult(res) {
   return function(entity) {
     if(entity) {
       return res.status(200).json(entity);
     } else {
       return [];
     }
   }
}

function handleError(res) {
  return function(err) {
    return res.status(500).send(err)
  }
}