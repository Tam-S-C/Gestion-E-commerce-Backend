import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título del producto es obligatorio."],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio."],
    min: [0, "El precio del producto debe ser un valor mayor a 0."]
},
  description: {
    type: String,
    required: [true, "La descripción del producto es obligatoria."],
  },
  code: {
    type: String,
    required: [true, "El código del producto es obligatorio y no debe repetirse."],
  },
  stock: {
    type: Number,
    required: [true, "El stock del producto es obligatorio."],
    default: 0,
  },
  category: {
    type: String,
    required: [true, "La categoría del producto es obligatoria."],
  },
  thumbnail: { 
    type: String, 
    require: false 
},
});

productSchema.plugin(mongoosePaginate);

export const productModel = model("products", productSchema, "products");

