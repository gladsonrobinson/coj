const pricingRule = [{
	"offer_id": "001",
	"offer_type": "deal",
	"ad_id": "classic",
	"offer_text": "Gets a 3 for 2 deals on Classic Ads",
	"get_min_qt": 3,
	"pay_price": 2
},{
	"offer_id": "002",
	"offer_type": "deal",
	"ad_id": "classic",
	"offer_text": "Gets a 5 for 4 deal on Classic Ads",
	"get_min_qt": 5,
	"pay_price": 4
},{
	"offer_id": "003",
	"offer_type": "price_drop",
	"ad_id": "standout",
	"offer_text": "Gets a discount on Standout Ads where the price drops to $299.99 per ad",
	"min_buy": 0,
	"buy_price": 299.99
},{
	"offer_id": "004",
	"offer_type": "price_drop",
	"ad_id": "premium",
	"offer_text": "Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad",
	"min_buy": 4,
	"buy_price": 379.99
},{
	"offer_id": "005",
	"offer_type": "price_drop",
	"ad_id": "standout",
	"offer_text": "Gets a discount on Standout Ads where the price drops to $309.99 per ad",
	"min_buy": 0,
	"buy_price": 309.99
},{
	"offer_id": "006",
	"offer_type": "price_drop",
	"ad_id": "premium",
	"offer_text": "Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad",
	"min_buy": 3,
	"buy_price": 389.99
}]

export default pricingRule;