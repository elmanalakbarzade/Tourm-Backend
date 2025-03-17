const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');


const destinationSchema = Schema({
    id: Number,
    destImg: String,
    destTitleEn: String,
    destTitleAz: String,
    destCount: Number
})

const destinationValidate = (destination) => {
    const schema = new Joi.object({
        id: Joi.number(),
        destinationImg: Joi.string(),
        destTitleAz: Joi.string(),
        destTitleEn: Joi.string(),
        destCount: Joi.number()

    })
    return schema.validate(destination);
};

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = { Destination, destinationValidate};