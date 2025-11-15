const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    thumb: String,
    link: { type: String, unique: true },
    shortDesc: String,
    description: String,
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    image: String,
}, { timestamps: true });

CategorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentId'
});

CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Category', CategorySchema);
