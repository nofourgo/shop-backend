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


app.use('/Category', categoryRoutes);
app.use('/Product', productRoutes);


// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
