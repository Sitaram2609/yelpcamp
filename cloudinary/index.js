const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'yelpcamp', // Cloudinary folder name
        allowed_formats: ['jpeg', 'png', 'jpg'], // Use snake_case for `allowed_formats`
    }

});

module.exports = {
    cloudinary,
    storage
};

