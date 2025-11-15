const Category = require('../models/Category');

exports.getListCategory = async (req, res) => {
    try {
        const categories = await Category.find().populate('children');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryByUrl = async (req, res) => {
    try {
        const category = await Category.findOne({ link: req.query.url }).populate('children');
        if (!category) return res.status(404).json({ message: 'Category not found' });
        category.filterList = []; 
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
