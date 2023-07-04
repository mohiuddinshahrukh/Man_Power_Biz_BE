const express = require("express");
const asyncHandler = require("express-async-handler");
const ServiceCategory = require("../../models/serviceCategoryModel");
const User = require("../../models/userModel");
const __isEmpty = require("lodash.isempty");
const __isEqual = require("lodash.isequal");
const getAllServiceCateogries = asyncHandler(async (req, res) => {
  try {
    const serviceCategories = await ServiceCategory.find();
    res.status(200).json({
      status: 200,
      data: serviceCategories,
      error: false,
      msg: "Categories returned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the categories",
    });
  }
});

const getAServiceCateogry = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a service category id to get`,
      });
    }
    const serviceCategory = await ServiceCategory.findById(req.params.id);
    if (!serviceCategory) {
      res.json({
        status: 400,
        error: true,
        msg: `A service category with the id: ${req.params.id} couldn't be found!`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: serviceCategory,
        error: false,
        msg: "Service category details fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: true,
      msg: "There was an error while fetching the categories",
    });
  }
});

const addServiceCategory = asyncHandler(async (req, res) => {
  try {
    let { id } = req.user;
    const { categoryTitle, categoryDescription } = req.body;

    if (!categoryTitle || !categoryDescription || !id) {
      res.json({
        status: 400,
        error: true,
        msg: "Please provide all required fields",
      });
    } else {
      const serviceCategory = await ServiceCategory.create({
        categoryTitle,
        categoryDescription,
        addedBy: id,
      });
      if (serviceCategory) {
        res.status(201).json({
          status: 201,
          data: serviceCategory,
          error: false,
          msg: "Service Category Created Successfully",
        });
      } else {
        res.json({
          status: 400,
          error: true,
          msg: "Service Category Creation Failed",
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

const updateServiceCategory = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a category id to update`,
      });
    } else if (__isEmpty(req.body)) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide required data to update a service category`,
      });
    } else {
      const serviceCategory = await ServiceCategory.findById(req.params.id);
      if (!serviceCategory) {
        res.json({
          status: 400,
          error: true,
          msg: `A service category with the id: ${req.params.id} couldn't be found!`,
        });
      } else {
        const updatedServiceCategory = await ServiceCategory.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        if (!updatedServiceCategory) {
          res.json({
            status: 400,
            error: true,
            msg: `Service category could not be updated in find and update`,
          });
        } else if (__isEqual(updatedServiceCategory, req.body)) {
          res.json({
            status: 400,
            error: true,
            msg: `Service category updated but old values and new values are the same`,
          });
        } else {
          res.json({
            status: 200,
            data: updatedServiceCategory,
            error: false,
            msg: `Service category updated successfully!`,
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

const deleteServiceCategory = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json({
        status: 400,
        error: true,
        msg: `Please provide a service category id to delete`,
      });
    } else {
      const categoryToDelete = await ServiceCategory.findById(req.params.id);
      if (!categoryToDelete) {
        res.json({
          status: 400,
          error: true,
          msg: `A service category with the given id doesn't exist`,
        });
      } else {
        const deletedCategory = await ServiceCategory.findByIdAndDelete(
          req.params.id
        );
        if (!deletedCategory) {
          res.json({
            status: 400,
            error: true,
            msg: `Service category couldn't be deleted`,
          });
        } else {
          res.json({
            status: 200,
            data: deletedCategory,
            error: false,
            msg: `Service category deleted successfully`,
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
  getAllServiceCateogries,
  getAServiceCateogry,
  addServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
