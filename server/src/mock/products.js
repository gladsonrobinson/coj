const products = {
	"customer_list": [{
		"cst_name": "APPLE",
		"cst_id": "apple",
		"avaialbel_offers": [{
			"offer_id" : "003",
			"offer_text" : "Gets a discount on Standout Ads where the price drops to $299.99 per ad"
		}]
	},{
		"cst_name": "UNILEVER",
		"cst_id": "unilever",
		"avaialbel_offers": [{
			"offer_id" : "001",
			"offer_text" : "Gets a 3 for 2 deals on Classic Ads"
		}]
	},{
		"cst_name": "NIKE",
		"cst_id": "nike",
		"avaialbel_offers": [{
			"offer_id" : "004",
			"offer_text" : "Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad"
		}]
	},{
		"cst_name": "FORD",
		"cst_id": "ford",
		"avaialbel_offers": [{
			"offer_id" : "002",
			"offer_text" : "Gets a 5 for 4 deal on Classic Ads"
		},{
			"offer_id" : "005",
			"offer_text" : "Gets a discount on Standout Ads where the price drops to $309.99 per ad"
		},{
			"offer_id" : "006",
			"offer_text" : "Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad"
		}]
	},{
		"cst_name": "AXE",
		"cst_id": "axe",
		"avaialbel_offers": []
	},{
		"cst_name": "COGNIZANT",
		"cst_id": "cognizant",
		"avaialbel_offers": []
	}],
	"ad_type_list" :[{
		"ad_name": "Classic Ad",
		"ad_id": "classic",
		"price": 269.99
	},{
		"ad_name": "Standout Ad",
		"ad_id": "standout",
		"price": 322.99
	},{
		"ad_name": "Premium Ad",
		"ad_id": "premium",
		"price": 394.99
	}]
}

export default products;
