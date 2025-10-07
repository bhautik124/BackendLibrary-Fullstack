// const cloudinary = require("../config/cloudinaryConfigForUser");

// const uploadResult = async (filepath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filepath);
//     return {
//       imgUrl: result.secure_url,
//       publicId: result.public_id,
//     };
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const deleteImg = async (publicId) => {
//   return await cloudinary.uploader.destroy(publicId);
// };
// module.exports = { uploadResult, deleteImg };

// const cloudinary = require("../config/cloudinaryConfigForUser");
// const streamifier = require("streamifier");

// const uploadBuffer = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     let cld_upload_stream = cloudinary.uploader.upload_stream(
//       { folder: "backednd-library-img" }, // optional: Cloudinary folder name
//       (error, result) => {
//         if (error) reject(error);
//         else
//           resolve({
//             imgUrl: result.secure_url,
//             publicId: result.public_id,
//           });
//       }
//     );

//     // buffer ko stream me convert karke Cloudinary ko bhejte hai
//     streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
//   });
// };

// const deleteImg = async (publicId) => {
//   return await cloudinary.uploader.destroy(publicId);
// };

// module.exports = { uploadBuffer, deleteImg };

const cloudinary = require("../config/cloudinaryConfigForUser");
const streamifier = require("streamifier");

const uploadBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: "backednd-library-img" },
      (error, result) => {
        if (error) reject(error);
        else
          resolve({
            imgUrl: result.secure_url,
            publicId: result.public_id,
          });
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
  });
};

const deleteImg = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadBuffer, deleteImg };
