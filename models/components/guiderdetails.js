const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');


const guiderDetailsSchema = Schema({

    id: Number,
    fullname: String,
    positionAz: String,
    positionEn: String,
    avatar: String,
    aboutMeAz: String,
    aboutMeEn: String,
    experiencesAz: String,
    experiencesEn: String,
    totalGuide: Number,
    totalServices: Number,
    awardwon: Number,
    totalevent: Number
})

const guiderDetailsValidate = (guiderDetails) => {
    const schema = new Joi.object({
        id: Joi.number(),
        fullname: Joi.string(),
        positionAz: Joi.string(),
        positionEn: Joi.string(),
        avatar: Joi.string(),
        aboutMeAz: Joi.string(),
        aboutMeEn: Joi.string(),
        experiencesAz: Joi.string(),
        experiencesEn: Joi.string(),
        totalGuide: Joi.number(),
        totalServices: Joi.number(),
        awardwon: Joi.number(),
        totalevent: Joi.number()
    })
    return schema.validate(guiderDetails);
};

const GuiderDetails = mongoose.model("GuiderDetails", guiderDetailsSchema);

module.exports = {
    GuiderDetails, guiderDetailsValidate
};