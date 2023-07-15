const asyncHandler = require("express-async-handler");
const Package = require("../../../models/packageModel");

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
      if (!packageTitle || !packageDescription || !packagePrice) {
        res.json({
          status: 400,
          error: true,
          msg: `Pacakge title, description and price are required`,
        });
      } else {
        let createdPackage = await Package.create({
          packageService,
          packageTitle,
          packageDescription,
          packagePrice,
          packageStatus,
          packageCoverImage,
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
