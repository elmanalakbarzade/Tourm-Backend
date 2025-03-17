const { Activity, activityValidate } = require('../models/components/activity');
const { deleteSingleOldImage } = require('../utils/deleteOldImage');


exports.activityList = async (req, res) => {
    const activity = await Activity.find();
    res.status(200).send(activity);
}

exports.activityAdd = async (req, res) => {
    const { error } = activityValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const activity = new Activity(req.body);
            activity.actImg = req.file.path;
            result = await activity.save();
        } else {
            const activity = new Activity(req.body);
            result = await activity.save();
        }
        res.status(201).send(result);
    }

}

exports.activityEdit = async (req, res) => {
    const { error } = activityValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const activity = await Activity.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await activity.save();

                res.status(200).json(activity);
            } else {
                const activity = await Activity.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(activity.actImg);
                activity.actImg = req.file.path;

                await activity.save();

                res.status(200).json(activity);

            }
        }
    }
}


exports.activityDelete = async (req, res) => {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(activity);
}