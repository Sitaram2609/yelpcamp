const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campground');
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({ storage });


// Routes for campgrounds
router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground));
  
router
  .route('/new')
  .get(isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.UpdateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router
  .route('/:id/edit')
  .get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
