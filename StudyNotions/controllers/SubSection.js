const SubSection = require("../models/SubSection");
const Section = require("../models/section");
const uploadImageToCloudinary = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    const video = req.files.videoFile;

    if (!title || !timeDuration || !description || !video || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "Missing properties",
      });
    }
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      video: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { next: true }
    )
      .populate("subSection")
      .exec();
    return res.status(201).json({
      success: true,
      message: "SubSection created successFully",
      updatedCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while creating SubSection ",
      error: err.message,
    });
  }
};
// updateSubSection

exports.updateSubSection = async (req, res) => {
  try {
    // fetch the body
    const { title, timeDuration, duration, subSectionId } = req.body;
    const video = req.files.videoFile;
    // validate user
    if (!title || !timeDuration || !description || !video || !subSectionId) {
      return res.status(404).json({
        success: false,
        message: "Missing properties",
      });
    }
    //update in subsection

    await SubSection.findByIdAndUpdate(
      subSectionId,
      { title, timeDuration, description, video },
      { next: true }
    );
    return res.status(201).json({
      success: true,
      message: "Subsection updated successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while updating Subsection ",
      error: err.message,
    });
  }
};

// Delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    // fetch the Id
    const { subSectionId } = req.body;

    // delete it
    await SubSection.findByIdAndDelete(subSectionId);
    // send response
    return res.status(201).json({
      success: true,
      message: "Subsection deleted successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while deleting Subsection ",
      error: err.message,
    });
  }
};
