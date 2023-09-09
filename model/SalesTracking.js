const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    color: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      
      default: 0,
    },
    sold: {
        type: Number,
        
        default: 0
    }
  });

const salesTrackingSchema = new Schema({
  product: [{
    codigo: { type: String, default: "" },
    titulo: { type: String, default: "" },
    precio: { type: Number, default: 0 },
    sold: { type: Number, default: 0 }
  }],
  referencia: { type: String, default: "" },
  metodo: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const SalesTracking = mongoose.model('SalesTracking', salesTrackingSchema);
module.exports = SalesTracking;