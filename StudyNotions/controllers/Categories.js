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
