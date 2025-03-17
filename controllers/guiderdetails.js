const { GuiderDetails, guiderDetailsValidate } = require('../models/components/guiderdetails');
const { deleteSingleOldImage } = require('../utils/deleteOldImage');


exports.guiderDetailsList = async (req, res) => {
    const guiderDetails = await GuiderDetails.find();
    res.status(200).send(guiderDetails);
}

exports.guiderDetailsAdd = async (req, res) => {
    const { error } = guiderDetailsValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const guiderDetails = new GuiderDetails(req.body);
            guiderDetails.avatar = req.file.path;
            result = await guiderDetails.save();
        } else {
            const guiderDetails = new GuiderDetails(req.body);
            result = await guiderDetails.save();
        }
        res.status(201).send(result);
    }

}

exports.guiderDetailsEdit = async (req, res) => {
    const { error } = guiderDetailsValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const guiderDetails = await GuiderDetails.findById(req.params.id);

        if (!guiderDetails) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const guiderDetails = await GuiderDetails.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await guiderDetails.save();

                res.status(200).json(guiderDetails);
            } else {
                const guiderDetails = await GuiderDetails.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(guiderDetails.avatar);
                guiderDetails.avatar = req.file.path;

                await guiderDetails.save();

                res.status(200).json(guiderDetails);

            }
        }
    }
}


exports.guiderDetailsDelete = async (req, res) => {
    const guiderDetails = await GuiderDetails.findByIdAndDelete(req.params.id);
    if (!guiderDetails) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(guiderDetails);
}