const asyncHandler = require("express-async-handler");
const Package = require("../../../models/packageModel");
const Service = require("../../../models/serviceModel");
const mongoose = require("mongoose");

const updatePackage = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide an id`,
      });
    } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a valid mongoose object id`,
      });
    } else {
      let findPackage = await Package.findById(req.params.id);
      if (!findPackage) {
        res.json({
          status: 400,
          error: true,
          msg: `A package with the provided id ${req.params.id} does not exist`,
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
            msg: `Package service,title,price & description are required`,
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
              req.body.packageCoverImage =
                packageImages.length > 0 ? packageImages[0] : "";
              let editedPackage = await Package.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                  new: true,
                }
              );
              if (!editedPackage) {
                res.json({
                  status: 400,
                  error: true,
                  msg: `The package couldn't be updated`,
                });
              } else {
                res.json({
                  status: 200,
                  error: false,
                  data: editedPackage,
                  msg: `Package edited successfully`,
                });
              }
            }
          }
        }
      }
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
module.exports = updatePackage;
