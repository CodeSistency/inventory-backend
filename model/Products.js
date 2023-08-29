const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
  color: {
    type: String,
    // required: true,
    default: ""
  },
  quantity: {
    type: Number,
    // required: true,
    default: 0,
  },
});



const productSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    default: "",
  },
  precio: {
    type: Number,
    required: true,
    default: 0,
  },
  // imagen: {
  //   type: String,
  //   default: ""
  // },
  // tallas: {
  //   S: [colorSchema],
  //   M: [colorSchema],
  //   L: [colorSchema],
  //   XL: [colorSchema],
  // },
  codigo: {
    type: String,
    default: "",
  }
  // imagenes_secundarias: [imageSchema],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     titulo: {
//         type: String,
//         required: true
//     },
//     descripcion: {
//         type: String,
//         required: true,
//         default: ""
//     },
//     precio: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     cantidad: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     imagen: {
//         type: String
//     },
//     talla_S: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_M: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_L: {
//         type: Boolean,
//         required: true,
//         default: false,
//     },
//     talla_XL: {
//         type: Boolean,
//         required: true,
//         default: false,
//     }
//     // talla: {
//     //     S: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     M: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     L: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     },
//     //     XL: {
//     //         type: Boolean,
//     //         required: true,
//     //         default: false,
//     //     }
//     // }
// }, {timestamps: true,});

// module.exports = mongoose.model('Products', productSchema);