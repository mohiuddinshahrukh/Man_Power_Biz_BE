const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Package = require("../../../models/packageModel");

const getAPackage = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: "No id sent with user request",
      });
    } else {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.json({
          status: 400,
          error: true,
          msg: "The id sent with request is not a valid mongoose id",
        });
      } else {
        let package = await Package.findById(id);
        if (package) {
          res.json({
            status: 200,
            data: package,
            error: false,
            msg: `Packages returned successfully`,
          });
        } else {
          res.json({
            status: 400,
            error: true,
            msg: `A package with the id: ${id} couldn't be found!`,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the package",
    });
  }
});
module.exports = getAPackage;
