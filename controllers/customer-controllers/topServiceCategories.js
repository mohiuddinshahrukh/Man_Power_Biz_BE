const asyncHandler = require("express-async-handler");
const Categories = require("../../models/serviceCategoryModel.js");

const getServiceCategories = asyncHandler(async (req, res) => {
  try {
    const serviceCategories = await Categories.find();
    if (!serviceCategories) {
      res.json({
        status: 400,
        error: true,
        msg: `Service Categories couldn't be fetched`,
      });
    } else {
      res.json({
        status: 200,
        error: false,
        data: serviceCategories,
        msg: `Service Categories fetched successfully`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `Service Categories couldn't be fetched`,
    });
  }
});

module.exports = getServiceCategories;
