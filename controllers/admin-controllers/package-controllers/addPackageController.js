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
          const allPackages = await Package.find().select(
            "packageService packageTitle"
          );
          if (!allPackages) {
            res.json({
              status: 400,
              error: true,
              msg: `Error in fetching all packages`,
            });
          } else {
            let filteredPackages = allPackages.filter((pkg) => {
              if (
                pkg.packageTitle == packageTitle &&
                pkg.packageService == packageService
              ) {
                return pkg;
              }
            });
            if (!filteredPackages.length > 0) {
              const createdPackage = await Package.create({
                packageService,
                packageTitle,
                packageDescription,
                packagePrice,
                packageStatus,
                packageCoverImage:
                  packageImages.length > 0 ? packageImages[0] : "",
                packageImages,
                packageVideos,
                packageBookings,
              });
              if (!createdPackage) {
                res.json({
                  status: 400,
                  error: true,
                  msg: `Package couldn't be created successfully`,
                });
              } else {
                const updatedService = await Service.findByIdAndUpdate(
                  packageService,
                  { $push: { servicePackages: createdPackage._id } },
                  { new: true }
                );
                if (!updatedService) {
                  res.json({
                    status: 400,
                    error: true,
                    msg: `Package created but couldn't be added to services successfully`,
                  });
                } else {
                  res.json({
                    status: 200,
                    error: false,
                    data: createdPackage,
                    msg: `Package couldn't be created successfully`,
                  });
                }
              }
            } else {
              res.json({
                status: 400,
                error: true,
                msg: `A package with the same title already exists in the service`,
              });
            }
            console.log();
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
            console.log(`${allPackages}`);
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
            console.log();
            // allPackages.filter();
          }
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

module.exports = addPackage;
