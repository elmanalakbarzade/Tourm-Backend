const { Tour, tourValidate } = require('../models/components/tour.js');
const { deleteManyOldImage } = require('../utils/deleteOldImage.js');

exports.tourList = async (req, res) => {
    try {
        const tours = await Tour.find().populate('activity').populate('destination');
        res.status(200).send(tours);
    } catch (error) {
        res.status(500).send("Error fetching tours");
    }
}
exports.tourListForActivity = async (req, res) => {
    const tours = await Tour.find({ activity: req.params.id });
    res.status(200).json(tours);
}

exports.tourListForDestination = async (req, res) => {
    const tours = await Tour.find({ destination: req.params.id });
    res.status(200).json(tours);
}



exports.tourAdd = async (req, res) => {
    const { error } = tourValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;

        // If no files are uploaded, save tour details without images
        if (filesObjLength === 0) {
            const tour = new Tour(req.body);
            const result = await tour.save();
            return res.status(201).send(result);
        } else {
            // If files are uploaded, handle image files
            const tour = new Tour(req.body);
            const uploadFiles = [];
            if (req.files.images) {
                req.files.images.map(item => uploadFiles.push(item.path));
            }
            tour.images = uploadFiles;

            const result = await tour.save();
            return res.status(201).send(result);
        }

    } catch (error) {
        res.status(500).send("Error adding tour");
    }
}

exports.tourEdit = async (req, res) => {
    const { error } = tourValidate(req.body);
    const paramsId = req.params.id;

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        let tour = await Tour.findById(paramsId);
        if (!tour) {
            return res.status(404).send("Tour not found");
        } else {
            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;

            if (filesObjLength === 0) {
                tour = await Tour.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                await tour.save();
                return res.status(200).json(tour);
            } else {
                tour = await Tour.findByIdAndUpdate(paramsId, {
                    ...req.body
                });

                // Delete old images
                deleteManyOldImage(tour.images);

                const uploadFiles = [];
                if (req.files.images) {
                    req.files.images.map(item => uploadFiles.push(item.path));
                }
                tour.images = uploadFiles;

                const result = await tour.save();
                return res.status(201).send(result);
            }
        }
    } catch (error) {
        res.status(500).send("Error editing tour");
    }
}

exports.tourDelete = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        if (!tour) {
            return res.status(404).send("Tour not found");
        }

        // Delete old images
        deleteManyOldImage(tour.images);

        res.status(200).send(tour);
    } catch (error) {
        res.status(500).send("Error deleting tour");
    }
}
