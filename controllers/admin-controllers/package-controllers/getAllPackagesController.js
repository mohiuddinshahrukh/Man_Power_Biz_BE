const asyncHandler = require("express-async-handler");
const Package = require("../../../models/packageModel");

const getAllPackages = asyncHandler(async (req, res) => {
  try {
    const packages = await Package.find().populate({
      path: "packageService",
      select: "serviceTitle",
      options: { lean: true },
    });
    const packagesData = packages.map((package) => {
      const { ...packageData } = package.toObject();
      const { _id: serviceId, ...serviceData } = packageData.packageService;
      return {
        ...packageData,
        ...serviceData,
      };
    });
    res.json({
      status: 200,
      data: packagesData,
      error: false,
      msg: `All packages returned successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the packages",
    });
  }
});

module.exports = getAllPackages;
