const {  PopularDestination, Gallery, ClientFeedback,  popularDestinationValidate, galleryValidate, clientFeedbackValidate } = require('../models/components/homepage.js');
const { deleteSingleOldImage } = require('../utils/deleteOldImage');


// Popular Destination
exports.popularDestinationList = async (req, res) => {
    const popularDestination = await PopularDestination.find();
    res.status(200).send(popularDestination);
}

exports.popularDestinationAdd = async (req, res) => {
    const { error } = popularDestinationValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const popularDestination = new PopularDestination(req.body);
            popularDestination.image = req.file.path;
            result = await popularDestination.save();
        } else {
            const popularDestination = new PopularDestination(req.body);
            result = await popularDestination.save();
        }
        res.status(201).send(result);
    }

}

exports.popularDestinationEdit = async (req, res) => {
    const { error } = popularDestinationValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const popularDestination = await PopularDestination.findById(req.params.id);

        if (!popularDestination) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const popularDestination = await PopularDestination.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await popularDestination.save();

                res.status(200).json(popularDestination);
            } else {
                const popularDestination = await PopularDestination.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(popularDestination.image);
                popularDestination.image = req.file.path;

                await popularDestination.save();

                res.status(200).json(popularDestination);

            }
        }
    }
}


exports.popularDestinationDelete = async (req, res) => {
    const popularDestination = await PopularDestination.findByIdAndDelete(req.params.id);
    if (!popularDestination) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(popularDestination);
}

// Gallery
exports.galleryList = async (req, res) => {
    const gallery = await Gallery.find();
    res.status(200).send(gallery);
}

exports.galleryAdd = async (req, res) => {
    const { error } = galleryValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const gallery = new Gallery(req.body);
            gallery.image = req.file.path;
            result = await gallery.save();
        } else {
            const gallery = new Gallery(req.body);
            result = await gallery.save();
        }
        res.status(201).send(result);
    }

}

exports.galleryEdit = async (req, res) => {
    const { error } = galleryValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const gallery = await Gallery.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await gallery.save();

                res.status(200).json(gallery);
            } else {
                const gallery = await Gallery.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(gallery.image);
                gallery.image = req.file.path;

                await gallery.save();

                res.status(200).json(gallery);

            }
        }
    }
}


exports.galleryDelete = async (req, res) => {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(gallery);
}


// Client Feedback
exports.clientFeedbackList = async (req, res) => {
    const clientFeedback = await ClientFeedback.find();
    res.status(200).send(clientFeedback);
}

exports.clientFeedbackAdd = async (req, res) => {
    const { error } = clientFeedbackValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const clientFeedback = new ClientFeedback(req.body);
            clientFeedback.image = req.file.path;
            result = await clientFeedback.save();
        } else {
            const clientFeedback = new ClientFeedback(req.body);
            result = await clientFeedback.save();
        }
        res.status(201).send(result);
    }

}

exports.clientFeedbackEdit = async (req, res) => {
    const { error } = clientFeedbackValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const clientFeedback = await ClientFeedback.findById(req.params.id);

        if (!clientFeedback) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const clientFeedback = await ClientFeedback.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await clientFeedback.save();

                res.status(200).json(clientFeedback);
            } else {
                const clientFeedback = await ClientFeedback.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(clientFeedback.avatar);
                clientFeedback.avatar = req.file.path;

                await clientFeedback.save();

                res.status(200).json(clientFeedback);

            }
        }
    }
}


exports.clientFeedbackDelete = async (req, res) => {
    const clientFeedback = await ClientFeedback.findByIdAndDelete(req.params.id);
    if (!clientFeedback) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(clientFeedback);
}
