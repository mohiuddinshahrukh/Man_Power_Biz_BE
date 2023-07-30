const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Categories = require("../../models/serviceCategoryModel");
const Services = require("../../models/serviceModel");
const getSpecificServiceCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 400,
        error: true,
        msg: `No id provided to get specific service against`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({
        status: 400,
        error: true,
        msg: `The provided id is not of the type mongoose object id`,
      });
    } else {
      const category = await Categories.findById(id).populate({
        path: "categoryServices",
        populate: {
          path: "servicePackages",
        },
      });
      if (!category) {
        res.json({
          status: 400,
          error: true,
          msg: `No category found against the given id`,
        });
      } else {
        const services = await Services.find();
        if (!services) {
          res.json({
            status: 400,
            error: true,
            msg: `No services found in the system`,
          });
        } else {
          res.json({
            status: 200,
            error: false,
            data: category,
            msg: `Category Services fetched successfully`,
          });
          //   }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});

module.exports = getSpecificServiceCategory;
