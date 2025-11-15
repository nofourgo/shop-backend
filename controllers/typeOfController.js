const TypeOf = require("../models/TypeOf");

exports.createTypeOf = async (req, res) => {
    try {
        const { value, name } = req.body;
        const item = await TypeOf.create({ value, name });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTypeOfList = async (req, res) => {
    try {
        const items = await TypeOf.find().sort({ value: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
