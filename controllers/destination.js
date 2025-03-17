const { Destination, destinationValidate } = require('../models/components/destination');
const { deleteSingleOldImage } = require('../utils/deleteOldImage');


exports.destinationList = async (req, res) => {
    const destination = await Destination.find();
    res.status(200).send(destination);
}

exports.destinationAdd = async (req, res) => {
    const { error } = destinationValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const destination = new Destination(req.body);
            destination.destImg = req.file.path;
            result = await destination.save();
        } else {
            const destination = new Destination(req.body);
            result = await destination.save();
        }
        res.status(201).send(result);
    }

}

exports.destinationEdit = async (req, res) => {
    const { error } = destinationValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const destination = await Destination.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await destination.save();

                res.status(200).json(destination);
            } else {
                const destination = await Destination.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(destination.destImg);
                destination.destImg = req.file.path;

                await destination.save();

                res.status(200).json(destination);

            }
        }
    }
}


exports.destinationDelete = async (req, res) => {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(destination);
}