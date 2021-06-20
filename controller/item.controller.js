const User = require("../schema/user.schema")
const fs = require("fs")
const Items = require("../schema/item.schema");
const {
    addItemtolist,
    updateItemtoList,
    removeItemtoList,
    clientredis
} = require("../middleware/redis")
const JWT = require("jsonwebtoken");
const config = require("../config/index");
const auth = require("../middleware/verifyToken")
const { validationResult } = require("express-validator");
const Model = require("../schema/models.schema");
const Tier_variation = require("../schema/tier_variations.schema")
const client = require("../elasticsearch/index")
const { v4: uuidv4 } = require('uuid');
const Models = require("../schema/models.schema");
module.exports = {
    /**
     * @URL /item/get
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    searchItem: async (req, res, next) => {
        let { keyword, category, sortPrice, rangePrice, rating, sold, page, limit } = req.query
console.log("keyword"+keyword);
        let searchQuery = {
            query: {
                bool: {
                //     must: [
                //         {
                //             query_string: {
                //                 query: `*${keyword}*`, fields: ["dec", "attributes.value.keyword", "name"],
                //                 analyzer: "whitespace",
                //                 tie_breaker: 0.7,
                //                 analyze_wildcard: true
                //             }
                //         }

                //     ],
                    filter: [
                        // { term: { category: "6052043ffd654697aa6d5e7b" } },
                        // { term: { category: "6052043ffd654697aa6d5e71" } },
                        // {
                        //     range: {
                        //         priceMin: {
                        //             gte: 10,
                        //             lte: 20,
                        //             boost: 2.0
                        //         }
                        //     }
                        // }
                    ]
                }
            },
            sort: [
                // { priceMin: { "order": "asc" } },
                "_score"
            ],
            from: 0,
            size: 20,
        }
	if(keyword=== '' || keyword===null || keyword===undefined){
		console.log("run");
		
	}
	else{
		searchQuery.query.bool.must=
		[
		       {
			   query_string: {
			       query: `*${keyword}*`, fields: ["dec", "attributes.value.keyword", "name"],
			       analyzer: "whitespace",
			       tie_breaker: 0.7,
			       analyze_wildcard: true
			   }
		       }

		   ]
	}
        limit ? limit = limit : limit = 20
        page ? page = (page - 1) : page = 0
        page < 0 ? page = 0 : page = page
        searchQuery.from = page * limit
       // console.log("category" + category);
        if (category) {
            category = JSON.parse(category)
		console.log(category);
            category.map((v, i) => {
                let newterm = {
                    term: { category: v },
                }
                searchQuery.query.bool.filter.push(newterm)

            })
        }
        console.log(searchQuery.query.bool.filter);
        if (rangePrice) {
            rangePrice = JSON.parse(rangePrice)
            let newRangePrice = {
                range: {
                    priceMin: {
                        gte: rangePrice.minPrice ? +rangePrice.minPrice : 1,
                        lte: rangePrice.maxPrice ? +rangePrice.maxPrice : 100000000000000000,
                        boost: 2.0
                    }
                }
            }
            console.log(newRangePrice);
            searchQuery.query.bool.filter.push(newRangePrice)
        }
        if (sortPrice) {

            let newsortPrice = {
                priceMin: { "order": sortPrice }
            }
            searchQuery.sort.push(newsortPrice)
        }
        if (sold) {

        }

        const result = await client.search({
            index: 'item',
            // Here the body must follow the `RequestBody` interface
            body: searchQuery

        })

        res.json(result.body.hits.hits)
    },
    getItems: async (req, res, next) => {
        res.status(200).json(res.advancedResults)
    },
    /**
     * @URL /item/get-one/:id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getone: async (req, res, next) => {
        const { id } = req.params
        console.log(id);
        const item = await Items.findById(id).populate("models").populate("category").populate("tier_variations")
        res.json(item)
    },

    /**
    * @URL /item/create
    * @method post
    * @param {name,priceMin,priceMax,discount,sold,category}
    */
    addItem: async (req, res, next) => {
	 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { priceMin, priceMax, name, desc, category, shopId, attributes, model, tier_variations } = req.body
	if(!priceMin){
		priceMin=0
	}
        if (priceMin > priceMax) {
            return res.json({ msg: "price min not > maxPrice" })
        }
        shopId = req.user.shopId
        let newtier_variation = []
        let newmodel = []
        const newitem = new Items({
            priceMin, priceMax, name, desc, category, shopId, attributes, tier_variations: newtier_variation, model: newmodel
        })
        if (model) {
            model.map((v, i) => {

                v.itemId = newitem._id
                v.price_before_discount = v.price
                // let newmodel = new Model({
                //     ...v
                // })

            })
            let insertManyModel = await Model.insertMany(model)
            insertManyModel.map((v, i) => {
                newmodel.push(v._id)
            })
        }
        if (tier_variations) {
            tier_variations.map((v, i) => {
                tier_variations.itemId = newitem._id

                // let newtier_variation = new Tier_variation({
                //     ...v
                // })
            })
            let insetManyTier_variation = await Tier_variation.insertMany(tier_variations)
            console.log("tiervariation", insetManyTier_variation);
            insetManyTier_variation.map((v, i) => {
                newtier_variation.push(v._id)
            })
        }
        newitem.models = newmodel
        newitem.tier_variations = newtier_variation
        await newitem.save()
        const reponse = await client.bulk({
            body: [
                // action description
                { index: { _index: 'item', _id: newitem._id } },
                { ...req.body }
            ]
        })
        res.json({ item: newitem, elastic: reponse, msg: "Add succesful !!!" })
    },

    // decreaseSoldAndQuantityItem: async (arrId) => {
    //     let itemsupdate = []

    //     var count = {};
    //     arrId.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
    //     arrId = [...new Set(arrId)]
    //     // const item=await Items.updateMany({_id:arrId.map((id)=>id)},{})
    //     await arrId.forEach(async (id) => {
    //         let quantity = count[id]

    //         const update = await decreaseSoldAndQuantityItemAsync(id, quantity)

    //         itemsupdate.push(update)
    //     })

    //     return itemsupdate

    // },


    updateItem: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {
            id, priceMin, priceMax, discount
        } = req.body
        if (priceMax < priceMin) {
            return res.json({ msg: "priceMax must greater than pmin price" })
        }

        const itemsupdate = await Items.findByIdAndUpdate(id,
            {
                $set: req.body,
            }
            , {
                useFindAndModify: false,
                new: true,
                runValidators: true
            })
        if (!itemsupdate) {
            return res.json({
                msg: "item not  found"
            })
        }

        if (discount) {
            const listModel = await Models.find({ itemId: id })

            let newarraypromise = []
            listModel.map((v, i) => {
                const result = Models.findByIdAndUpdate(v._id, {
                    price: v.price_before_discount - (v.price_before_discount / 100 * discount),
                    price_before_discount: v.price
                })
                newarraypromise.push(result)
            })
            // if((listModel).length>0){
            Promise.all(newarraypromise).then(response => console.log(response))

            // }
        }

        const response = await client.update({
            index: 'item',
            type: '_doc',
            id: itemsupdate._id,
            body: {
                // action description
                doc: {
                    // category: itemsupdate.caetegory,
                    // models: itemsupdate.models,
                    // tier_variations: itemsupdate.tier_variations,
                    // numberRating: itemsupdate.numberRating,
                    // _id: itemsupdate._id,
                    priceMax: itemsupdate.priceMax,
                    priceMin: itemsupdate.priceMin,
                    name: itemsupdate.name,
                    desc: itemsupdate.desc,
                    // attributes: itemsupdate.attributes,
                    version: itemsupdate.version,
                    discount: itemsupdate.discount

                }
            }
        })
        res.json({
            itemsupdate: itemsupdate, elastic: response
        })
    },
    deleteItem: async (req, res, next) => {

        const { id } = req.params
        console.log(id);
        try {
            const items = await Items.findById(id)
            if (!items) {
                return res.json({
                    msg: "item not found"
                })
            }

            await items.remove();
            const model = await Models.deleteMany({ itemId: id })
            console.log(model);
            const response = await client.delete({
                index: 'item',
                type: '_doc',
                id: items._id,

            })
            res.json({
                msg: "remove successful"
            })

        } catch (error) {
            res.json({ msg: "some problem" })
        }
    },
    uploadImage: async (req, res, next) => {
        let path = req.file && req.file.path
        console.log(req.file);
        console.log(path);
        const { subject } = req.body
        try {
            if (!path) {
                return res.status(400).json({
                    msg: "image null"
                })
            }
            path = path.slice(7, path.length)
            res.json({ path: path })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "no found"
            })
        }
    },
    deleteImage: async (req, res, next) => {
        let { path } = req.body
        path = "public/" + path
        fs.unlink(path, (err) => {
            if (err) {
                return res.status(400).json({ msg: "not found" })
            }
            res.json({ path, msg: "delete successful" })
        })
    },


}