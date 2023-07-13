const Section = require("../models/section");
const Course = require("../models/course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(404).json({
        success: false,
        message: "Missing properties",
      });
    }
    // create Section
    const newSection = await Section.create({ sectionName });
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { next: true }
    );

    return res.status(201).json({
      success: true,
      message: "Section created successFully",
      updatedCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while creating section ",
      error: err.message,
    });
  }
};

exports.updateSections = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "Missing properties",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { next: true }
    );
    return res.status(201).json({
      success: true,
      message: "Section updated successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while updating section ",
      error: err.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await Section.findByIdAndDelete(sectionId);
    return res.status(201).json({
        success: true,
        message: "Section deleted successFully",
      });

  } catch (err) {return res.status(400).json({
    success: false,
    message: "Issue while deleting section ",
    error: err.message,
  });}
};
