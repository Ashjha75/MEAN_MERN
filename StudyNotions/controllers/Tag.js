const Tag = require("../models/tag");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "Please fill required fields",
      });
    }

    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while creating tags",
    });
  }
};

exports.findAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });

    res.status(200).json({
      success: true,
      message: "Tag fetched successfully",
      data: allTags,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while finding tags",
    });
  }
};
