const ModelsSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: Number
  },
  normal_stock: {
    type: Number
  },
  promotion_id: {
    type: String
  },
  promotion_stock: {
    type: Number
  },
  price: {
    type: Number,
  },
  price_before_discount: {
    type: Number
  },
  sold: {
    type: Number
  },
  price_stocks: [{
    price: {
      type: Number
    },
    stockout_time: {
      type: Date
    },
    purchase_limit: {
      type: Number
    },
    shopId: {
      type: Number
    },
    promotion_id: {
      type: String,
    },
    promotion_type: {
      type: Number
    },
    start_time: {
      type: Date
    },
    end_time: {
      type: Date
    }
  }]



},
  { timestamps: true },

)

ModelsSchema.set('versionKey', 'version');
ModelsSchema.plugin(updateIfCurrentPlugin);
const Models = mongoose.model("models", ModelsSchema)
export { Models };