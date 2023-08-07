const asyncHandler = require("express-async-handler");
const Category = require("../../models/serviceCategoryModel");

const getAllServiceCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "categoryServices",
    });
    if (!categories) {
      res.json({
        status: 400,
        error: true,
        msg: `No categories could be retrieved`,
      });
    } else {
      res.json({
        status: 200,
        error: false,
        data: categories,
        msg: `Categories fetched successfully`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      error: true,
      msg: `${error}`,
    });
  }
});
module.exports = getAllServiceCategories;
