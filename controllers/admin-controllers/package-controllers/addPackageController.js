const asyncHandler = require("express-async-handler");
const Package = require("../../../models/packageModel");
const Service = require("../../../models/serviceModel");
const mongoose = require("mongoose");
const addPackage = asyncHandler(async (req, res) => {
  try {
    if (!req.body) {
      res.json({
        status: 400,
        error: true,
        msg: `Request body is missing`,
      });
    } else {
      const {
        packageService,
        packageTitle,
        packageDescription,
        packagePrice,
        packageStatus,
        packageCoverImage,
        packageImages,
        packageVideos,
        packageBookings,
      } = req.body;
      if (
        !packageService ||
        !packageTitle ||
        !packageDescription ||
        !packagePrice
      ) {
        res.json({
          status: 400,
          error: true,
          msg: `Package service, title, description and price are required`,
        });
      } else {
        if (!mongoose.Types.ObjectId.isValid(packageService)) {
          res.json({
            status: 400,
            error: true,
            msg: `The provided service id is not of mongoose type`,
          });
        } else {
          let getService = await Service.findById(packageService);
          if (!getService) {
            res.json({
              status: 400,
              error: true,
              msg: `A service with the provided id: ${packageService} doesn't exist`,
            });
          } else {
            let createdPackage = await Package.create({
              packageService,
              packageTitle,
              packageDescription,
              packagePrice,
              packageStatus,
              packageCoverImage:
                packageImages?.length > 0 ? packageImages[0] : "",
              packageImages,
              packageVideos,
              packageBookings,
            });
            if (!createdPackage) {
              res.json({
                status: 400,
                error: true,
                msg: `Package couldn't be added`,
              });
            } else {
              res.json({
                status: 201,
                error: false,
                data: createdPackage,
                msg: `Package created successfully`,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      status: 400,
      msg: `${error}`,
    });
  }
});

module.exports = addPackage;
