const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    prodName: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    sku: { type: String, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    thumb: String,
    shortDesc: String,
    description: String,
    specification: String,
    dataSheet: String,
    quantity: { type: Number, default: 0 },
    media: [{ type: String }],
    typeOf: [{ type: Number }], 
    width: Number, 
    length: Number, 
    recycle: String, 
    performanceFeatures: [{ type: String }],
    altRef: String,       
    maxWeight: Number,    
    color: String,        
    material: String      
}, { timestamps: true });


module.exports = mongoose.model('Product', ProductSchema);
