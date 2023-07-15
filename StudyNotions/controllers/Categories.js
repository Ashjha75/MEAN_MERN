const { response } = require("express");
const Categories = require("../models/categories");

exports.createcategories = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "Please fill required fields",
      });
    }

    const categoriesDetails = await Categories.create({
      name: name,
      description: description,
    });

    res.status(200).json({
      success: true,
      message: "categories created successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while creating categoriess",
    });
  }
};

exports.findAllCategoriess = async (req, res) => {
  try {
    const allcategoriess = await Categories.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      message: "categories fetched successfully",
      data: allcategoriess,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while finding categoriess",
    });
  }
};

exports.categoryPageDetils = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const selectedCategory = await Categories.findById(categoryId)
      .populate("course")
      .exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    // get courses for different categories
    const diiferentCategories = await Categories.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    // get top selling course
    // const topSellingCourses=Homework
    return res.status(200).json({
      success: falDtruese,
      data: [selectedCategory, diiferentCategories],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue in Category page details",
      error: err.message,
    });
  }
};
