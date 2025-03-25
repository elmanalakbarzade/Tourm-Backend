const { Tour, tourValidate } = require('../models/components/tour.js');
const { deleteManyOldImage } = require('../utils/deleteOldImage.js');

exports.tourList = async (req, res) => {
    const tours = await Tour.find().populate('activity').populate('destination');
    res.status(200).send(tours);
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
    if (error) return res.status(400).send(error.message);

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    if (filesObjLength === 0) {
        const tour = new Tour(req.body);
        const result = await tour.save();
        return res.status(201).send(result);
    } else {
        const tour = new Tour(req.body);
        const uploadFiles = [];
        if (req.files.images) {
            req.files.images.map(item => uploadFiles.push(item.path));
        }
        tour.images = uploadFiles;

        const result = await tour.save();
        return res.status(201).send(result);
    }
}

exports.tourEdit = async (req, res) => {
    const { error } = tourValidate(req.body);
    const paramsId = req.params.id;

    if (error) return res.status(400).send(error.message);

    let tour = await Tour.findById(paramsId);
    if (!tour) return res.status(404).send("Tour not found");

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    if (filesObjLength === 0) {
        tour = await Tour.findByIdAndUpdate(paramsId, { ...req.body });
        await tour.save();
        return res.status(200).json(tour);
    } else {
        tour = await Tour.findByIdAndUpdate(paramsId, { ...req.body });
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

exports.tourDelete = async (req, res) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).send("Tour not found");

    deleteManyOldImage(tour.images);

    res.status(200).send(tour);
}