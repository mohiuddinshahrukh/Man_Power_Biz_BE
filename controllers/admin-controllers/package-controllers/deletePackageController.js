const asyncHandler = require("express-async-handler");
const Package = require("../../../models/packageModel");
const mongoose = require("mongoose");
const deletePackage = asyncHandler(async (req, res) => {
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
      const findPackage = await Package.findById(req.params.id);
      if (!findPackage) {
        res.json({
          status: 400,
          error: true,
          msg: `A package with the provided id ${req.params.id} does not exist`,
        });
      } else {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);
        if (!deletePackage) {
          res.json({
            status: 400,
            error: true,
            msg: `The package was found but couldn't be deleted`,
          });
        } else {
          res.json({
            status: 200,
            error: false,
            data: deletedPackage,
            msg: `Package deleted successfully`,
          });
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
module.exports = deletePackage;
