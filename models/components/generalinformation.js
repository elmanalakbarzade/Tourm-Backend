const Joi = require("joi");
const { Schema, default: mongoose } = require("mongoose");

const generalInformationSchema = Schema(
    {
        iconUrl: String,
        favicon: String,
        sloganAz: String,
        sloganEn: String,
        phoneNumber: String,
        addressAz: String,
        addressEn: String,
        email: String,
        whatsappUrl: String,
        fbUrl: String,
        instagramUrl: String,
        youtubeUrl: String,
        openingHours: String,
        locationAz: String,
        locationEn: String
    },
    { timestamps: true },
);

const generalInformationValidate = (generalInformation) => {
    const schema = Joi.object({
        iconUrl: Joi.string(),
        favicon: Joi.string(),
        sloganAz: Joi.string(),
        sloganEn: Joi.string(),
        phoneNumber: Joi.string(),
        addressAz: Joi.string(),
        addressEn: Joi.string(),
        email: Joi.string(),
        whatsappUrl: Joi.string(),
        fbUrl: Joi.string(),
        instagramUrl: Joi.string(),
        youtubeUrl: Joi.string(),
        openingHours: Joi.string(),
        locationAz: Joi.string(),
        locationEn: Joi.string(),


    });
    return schema.validate(generalInformation);
};

const GeneralInformation = mongoose.model("GeneralInformation", generalInformationSchema);

module.exports = { GeneralInformation, generalInformationValidate };
