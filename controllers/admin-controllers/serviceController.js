const asyncHandler = require("express-async-handler");
const Service = require("../../models/serviceModel");
const __isEmpty = require("lodash.isempty");
const __isEqual = require("lodash.isequal");
const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      status: 200,
      data: services,
      error: false,
      msg: "Services returned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the services",
    });
  }
});

const getAService = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a service id to get`,
      });
    }
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.json({
        status: 400,
        error: true,
        msg: `A service with the id: ${req.params.id} couldn't be found!`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: service,
        error: false,
        msg: "Service details fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the service",
    });
  }
});

const addService = asyncHandler(async (req, res) => {
  try {
    let { id } = req.user;
    const {
      serviceTitle,
      serviceDescription,
      serviceCategory,
      serviceCity,
      serviceZipCode,
      serviceContactPhone,
      serviceWhatsAppPhone,
      serviceInfoEmail,
      serviceImages,
      serviceVideos,
      servicePDF,
      serviceCoverImage,
      serviceAddress,
      
    } = req.body;

    if (
      !serviceTitle ||
      !serviceDescription ||
      !id ||
      !serviceCategory ||
      !serviceCity ||
      !serviceZipCode ||
      !serviceContactPhone ||
      !serviceWhatsAppPhone ||
      !serviceInfoEmail
    ) {
      res.json({
        status: 400,
        error: true,
        msg: "Please provide all required fields",
      });
    } else {
      const service = await Service.create({
        serviceTitle: serviceTitle,
        serviceDescription: serviceDescription,
        serviceCategory: serviceCategory,
        serviceInfoEmail: serviceInfoEmail,
        serviceAddedBy: id,
        serviceWhatsAppPhone: serviceWhatsAppPhone,
        serviceContactPhone: serviceContactPhone,
        serviceAddress: serviceAddress,
        serviceZipCode: serviceZipCode,
        serviceCity: serviceCity,
        serviceCoverImage: serviceCoverImage,
        serviceImages: serviceImages ? serviceImages : [],
        serviceVideos: serviceVideos ? serviceVideos : [],
        servicePDF: servicePDF ? servicePDF : [],
      });
      if (service) {
        res.status(201).json({
          status: 201,
          data: service,
          error: false,
          msg: "Service Created Successfully",
        });
      } else {
        res.json({
          status: 400,
          error: true,
          msg: "Service creation failed",
        });
      }
    }
  } catch (error) {
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${error}`,
    });
  }
});

const updateService = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a service id to update`,
      });
    } else if (__isEmpty(req.body)) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide required data to update a service `,
      });
    } else {
      const service = await Service.findById(req.params.id);
      if (!service) {
        res.json({
          status: 400,
          error: true,
          msg: `A service with the id: ${req.params.id} couldn't be found!`,
        });
      } else {
        const updatedService = await Service.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        if (!updatedService) {
          res.json({
            status: 400,
            error: true,
            msg: `Service could not be updated in find and update`,
          });
        } else if (__isEqual(updatedService, req.body)) {
          res.json({
            status: 400,
            error: true,
            msg: `Service updated but old values and new values are the same`,
          });
        } else {
          res.json({
            status: 200,
            data: updatedService,
            error: false,
            msg: `Service updated successfully!`,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${err}`,
    });
  }
});

const deleteService = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a service id to delete`,
      });
    } else {
      const serviceToDelete = await Service.findById(req.params.id);
      if (!serviceToDelete) {
        res.json({
          status: 400,
          error: true,
          msg: `A service with the given id doesn't exist`,
        });
      } else {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
          res.json({
            status: 400,
            error: true,
            msg: `Service couldn't be deleted`,
          });
        } else {
          res.json({
            status: 200,
            data: deletedService,
            error: false,
            msg: `Service deleted successfully`,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      error: true,
      msg: `The following error occurred: ${err}`,
    });
  }
});
module.exports = {
  getAllServices,
  getAService,
  addService,
  updateService,
  deleteService,
};
