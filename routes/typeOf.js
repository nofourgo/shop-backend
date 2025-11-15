const express = require("express");
const router = express.Router();
const controller = require("../controllers/typeOfController");

router.post("/create", controller.createTypeOf);
router.get("/list", controller.getTypeOfList);

module.exports = router;
