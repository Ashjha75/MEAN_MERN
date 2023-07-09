const cloudinary = require("cloudinary").v2;
const File = require("../model/Fiile");

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file: ", file);
    // define server's path...
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    //   move the file
    file.mv(path, (err) => {
      console.log("error while moving the file");
    });
    res.status(200).json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Issue in file uploadeing",
      error: err.message,
    });
  }
};

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.fileUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;
    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedType = ["jpg", "jpeg", "png"];

    if (!isSupportedType(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const upload = await uploadFileToCloudinary(file, "fileUploadFolder", 30);

    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: upload.secure_url,
    });

    res.status(200).json({
      success: true,
      data: fileData,
      message: "File Uploaded Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: " Issue While File Uploading",
      error: err.message,
    });
  }
};

function isSupportedType(type, supportedType) {
  return supportedType.includes(type);
}

// Video Upload

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoField;
    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedType = ["mp4", "mov", "png"];

    if (!isSupportedType(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const upload = await uploadFileToCloudinary(file, "fileUploadFolder");
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: upload.secure_url,
    });

    res.status(200).json({
      success: true,
      data: fileData,
      message: "File Uploaded Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: " Issue While Video Uploading",
      error: err.message,
    });
  }
};

// ImageSizeReducer
