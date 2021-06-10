const cloudinary = require("cloudinary").v2;
const config = require("config");

// Connect to Cloudinary
cloudinary.config({
  cloud_name: config.get("cloudinaryName"),
  api_key: config.get("cloudinaryAPI"),
  api_secret: config.get("cloudinarySecret"),
});

// Upload an image to Cloudinary
// Different editing options depending on the preset
const uploadImage = async (image, preset) => {
  try {
    const uploaded = await cloudinary.uploader.upload(
      image,
      {
        upload_preset: preset,
      },
      (err, result) => {
        if (err) return console.log(err);
      }
    );
    // Save only the neccessary information from the response
    const { public_id, secure_url } = uploaded;
    const reply = {
      public_id,
      secure_url,
    };
    return reply;
  } catch (err) {
    return console.log("Cloudinary server error.");
  }
};

// Delete an image from Cloudinary
const deleteImage = async (id) => {
  try {
    await cloudinary.uploader.destroy(id, (err, result) => {
      if (err) return console.log(err);
    });
  } catch (err) {
    return console.log("Cloudinary server error.");
  }
};

// Get a default profile picture in case none was provided
const getDefaultImage = async () => {
  try {
    const defaultPic = await cloudinary.search
      .expression("folder=default")
      .execute();
    const reply = {
      public_id: defaultPic.resources[0].public_id,
      secure_url: defaultPic.resources[0].secure_url,
    };
    return reply;
  } catch (err) {
    return console.log("Cloudinary server error");
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getDefaultImage,
};
