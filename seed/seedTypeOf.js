const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const TypeOf = require('../models/TypeOf');

const seedTypeOf = async () => {
    try {
        // Kết nối DB
        await connectDB();
        console.log("Connected to MongoDB!");

        // Xóa toàn bộ TypeOf cũ
        await TypeOf.deleteMany({});
        console.log("Old TypeOf items cleared!");

        // Data bạn yêu cầu
        const items = [
            { value: 1, name: "Food Storage" },
            { value: 2, name: "Trash Bag" },
            { value: 3, name: "Knife – Case – Storage Box" },
            { value: 4, name: "Containers" },
            { value: 5, name: "Gloves" } // nếu có tên thì sửa lại
        ];

        await TypeOf.insertMany(items);
        console.log("TypeOf seeded successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Seed TypeOf error:", error);
        process.exit(1);
    }
};

seedTypeOf();
