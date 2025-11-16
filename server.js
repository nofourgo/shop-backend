const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
app.use("/TypeOf", require("./routes/typeOf"));

app.get("/", (req, res) => {
    res.json({ message: process.env.MONGODB_URI });
});
app.use('/Category', categoryRoutes);
app.use('/Product', productRoutes);
console.log("MONGODB_URI =", );

// Connect MongoDB
connectDB();

// ❌ KHÔNG app.listen()
// export ra để serverless function dùng
module.exports = app;
