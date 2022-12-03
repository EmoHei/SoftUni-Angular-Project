const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { tourController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', tourController.getTours);
router.post('/', auth(), tourController.createTour);

router.get('/:tourId', tourController.getTour);
router.post('/:tourId', auth(), postController.createPost);
router.put('/:tourId', auth(), tourController.subscribe);
router.put('/:tourId/posts/:postId', auth(), postController.editPost);
router.delete('/:tourId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), tourController.getReservations);

module.exports = router