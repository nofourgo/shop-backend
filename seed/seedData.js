const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

const LOREM = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const seedData = async () => {
    await connectDB();

    await Category.deleteMany({});

    // --- SUSTAINABLE PRODUCTS ---
    const sustainable = await Category.create({
        categoryName: 'Sustainable Products',
        link: 'sustainable-products',
        shortDesc: LOREM,
        image: `/images/website/market_1.png`
    });

    await Category.create({
        categoryName: 'Compostable Products 1',
        link: 'compostable-products-1',
        parentId: sustainable._id,
        shortDesc: LOREM,
        image: `/images/website/image_box_1.png`
    });

    await Category.create({
        categoryName: 'Compostable Products 2',
        link: 'compostable-products-2',
        parentId: sustainable._id,
        shortDesc: LOREM,
        image: `/images/website/image_box_2.png`
    });

   
    const consumerGoods = await Category.create({
        categoryName: 'Consumer Goods',
        link: 'consumer-goods',
        shortDesc: LOREM,
        image: `/images/website/market_2.png`
    });

    const consumerCon = ['Cutlery/Straws', 'Cups/Lids', 'Food Containers', 'Glovess'];
    for (let i = 0; i < consumerCon.length; i++) {
        await Category.create({
            categoryName: consumerCon[i],
            link: `consumer-${i + 1}`,
            parentId: consumerGoods._id,
            shortDesc: LOREM,
            image: `/images/website/consummer_${i + 1}.png`
        });
    }
    const packaging = await Category.create({
        categoryName: 'Packaging',
        link: 'packaging',
        shortDesc: LOREM,
        image: `/images/website/market_3.png`
    });
    const packagingCon = ['Consumer Packaging', 'Industrial Packaging'];
    for (let i = 0; i < packagingCon.length; i++) {
        await Category.create({
            categoryName: packagingCon[i],
            link: `packaging-${i + 1}`,
            parentId: packaging._id,
            shortDesc: LOREM,
            image: `/images/website/Packaging_${i + 1}.png`
        });
    }
    const engineeringPlastics = await Category.create({
        categoryName: 'Engineering Plastics',
        link: 'engineering-plastics',
        shortDesc: LOREM,
        image: `/images/website/market_4.png`
    });

    const engineeringCon = ['Automotive/Motorbike Parts', 'Molds', 'Household Appliances Parts', 'Electronics Parts', 'Pallets/Cargo Containers'];
    for (let i = 0; i < engineeringCon.length; i++) {
        await Category.create({
            categoryName: engineeringCon[i],
            link: `engineering-${i + 1}`,
            parentId: engineeringPlastics._id,
            shortDesc: LOREM,
            image: `/images/website/Engineering_${i + 1}.png`
        });
    }

    const buildingMaterials = await Category.create({
        categoryName: 'Building Materials',
        link: 'building-materials',
        shortDesc: LOREM,
        image: `/images/website/market_5.png`
    });

    const buildingCon = ['Interior', 'Exterior'];
    for (let i = 0; i < buildingCon.length; i++) {
        await Category.create({
            categoryName: buildingCon[i],
            link: `building-${i + 1}`,
            parentId: buildingMaterials._id,
            shortDesc: LOREM,
            image: `/images/website/Building_${i + 1}.png`
        });
    }

    const rawMaterials = await Category.create({
        categoryName: 'Raw Materials',
        link: 'raw-materials',
        shortDesc: LOREM,
        image: `/images/website/market_6.png`

    });

    const rawCon = ['Plastic Resins', 'Masterbatch/Compound', 'CaCO3 Powder'];
    for (let i = 0; i < rawCon.length; i++) {
        await Category.create({
            categoryName: rawCon[i],
            link: `raw-${i + 1}`,
            parentId: rawMaterials._id,
            shortDesc: LOREM,
            image: `/images/website/Raw_${i + 1}.png`

        });
    }

    console.log('All categories seeded successfully with Lorem Ipsum!');
    process.exit();
};

seedData();
