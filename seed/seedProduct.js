const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const Product = require('../models/Product');

const seedProducts = async () => {
    try {
        // Kết nối DB
        await connectDB();
        console.log("Connected to MongoDB!");

        // Xóa toàn bộ Product cũ
        await Product.deleteMany({});
        console.log("Old products cleared!");

        // Tạo sản phẩm với các field filter + Performance Features + Product Information
        const products = [
            {
                prodName: "Food Wrap",
                slug: "food-wrap",
                sku: "FW-001",
                categoryId: "6916e3361965a4d7a3d95466",
                thumb: "/images/website/product_1.png",
                shortDesc: "High-quality food wrapping film for household and industrial use.",
                description: "Food Wrap is designed to preserve freshness and prevent contamination.",
                specification: "Material: PE\nWidth: 30cm\nLength: 300m\nThickness: 12 micron",
                dataSheet: "https://example.com/datasheet/food-wrap.pdf",
                media: [
                    "/images/website/product-list_1.png",
                    "/images/website/product-list_3.png",
                    "/images/website/product-list_6.png",
                    "/images/website/product-list_8.png",
                ],
                quantity: 120,
                typeOf: [3, 5],   // Food Storage + Knife – Case – Storage Box
                width: 30,        // cm
                length: 300,      // cm
                recycle: "Yes",
                performanceFeatures: [
                    "Transparent and flexible",
                    "Sharp cutting bar",
                    "Easy to use for food preservation",
                    "FDA Compliant",
                    "CFIA Compliant",
                    "Kosher Compliant"
                ],
                altRef: "3061110050",
                maxWeight: 1,
                color: "Clear",
                material: "PVC"
            },
            {
                prodName: "Overlock Jumbo Bag",
                slug: "overlock-jumbo-bag",
                sku: "OJB-001",
                categoryId: "6916e3361965a4d7a3d9547a",
                thumb: "/images/website/product_2.png",
                shortDesc: "Heavy-duty overlock-stitched jumbo bag for industrial packaging.",
                description: "Overlock Jumbo Bag is built for high-strength industrial applications.",
                specification: "Material: PP Woven\nSize: 90x90x120cm\nSWL: 1500 kg\nSafety Factor: 5:1",
                dataSheet: "https://example.com/datasheet/overlock-jumbo-bag.pdf",
                media: [
                    "/images/website/product-list_2.png",
                    "/images/website/product-list_4.png",
                    "/images/website/product-list_5.png",
                    "/images/website/product-list_7.png",
                    "/images/website/product-list_9.png",
                ],
                quantity: 80,
                typeOf: [4, 6],   // Trash Bags + Containers
                width: 90,
                length: 120,
                recycle: "No",
                performanceFeatures: [
                    "Durable and heavy-duty",
                    "High load capacity",
                    "Industrial-grade stitching",
                    "Reusable and recyclable",
                    "Safe for heavy goods"
                ],
                altRef: "4072220045",
                maxWeight: 1500,
                color: "Blue",
                material: "PP Woven"
            }
        ];

        await Product.insertMany(products);
        console.log("Products seeded successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedProducts();
