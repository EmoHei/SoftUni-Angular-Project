// TODO
const { tourModel } = require('../models');
const { newPost } = require('./postController')

function getTours(req, res, next) {
    tourModel.find()
        .populate('userId')
        .then(tours => res.json(tours))
        .catch(next);
}

function getTour(req, res, next) {
    const { tourId } = req.params;

    tourModel.findById(tourId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(tour => res.json(tour))
        .catch(next);
}

function createTour(req, res, next) {
    const { tourName, postText } = req.body;
    const { _id: userId } = req.user;

    tourModel.create({ tourName, userId, subscribers: [userId] })
        .then(tour => {
            newPost(postText, userId, tour._id)
                .then(([_, updatedTour]) => res.status(200).json(updatedTour))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const tourId = req.params.tourId;
    const { _id: userId } = req.user;
    tourModel.findByIdAndUpdate({ _id: tourId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTour => {
            res.status(200).json(updatedTour)
        })
        .catch(next);
}

module.exports = {
    getTours,
    createTour,
    getTour,
    subscribe,
}
