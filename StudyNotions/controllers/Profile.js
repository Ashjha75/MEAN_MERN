const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    // get UserId
    const id = req.user.id;
    // validations
    if (!contactNumber || !gender || !id) {
      return res.status(201).json({
        success: true,
        message: "Profile updated successFully",
      });
    }
    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.dateofBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    return res.status(201).json({
      success: true,
      message: "Profile updated successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while updating profile ",
      error: err.message,
    });
  }
};

// Delete Account

exports.deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    await User.findByIdAndDelete({ _id: id });

    return res.status(201).json({
      success: true,
      message: "Profile deleted successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while deleting profile ",
      error: err.message,
    });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Profile deleted successFully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while fetching profile data ",
      error: err.message,
    });
  }
};
