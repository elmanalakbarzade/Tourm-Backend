const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');


const activitySchema = Schema({
    id: Number,
    actImg: String,
    actTitleEn: String,
    actTitleAz: String,
    tripCount: Number
})

const activityValidate = (activity) => {
    const schema = new Joi.object({
        id: Joi.number(),
        actImg: Joi.string(),
        actTitleAz: Joi.string(),
        actTitleEn: Joi.string(),
        tripCount: Joi.number()

    })
    return schema.validate(activity);
};

const Activity = mongoose.model("Activity", activitySchema);

module.exports = { Activity, activityValidate};