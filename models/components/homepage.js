const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');

//Popular Destination

const popularDestinationSchema = Schema({
    id: Number,
    titleEn: String,
    titleAz: String,
    location: String,
    price: Number,
    duration: String,
    image: String

})

const popularDestinationValidate = (popularDestination) => {
    const schema = new Joi.object({
        id: Joi.number(),
        titleAz: Joi.string(),
        titleEn: Joi.string(),
        location: Joi.string(),
        price: Joi.number(),
        duration: Joi.string(),
        image: Joi.string(),
    })
    return schema.validate(popularDestination);
};

const PopularDestination = mongoose.model("PopularDestination", popularDestinationSchema);

//Gallery

const gallerySchema = Schema({

    id: Number,
    title: String,
    image: String,

})

const galleryValidate = (gallery) => {
    const schema = new Joi.object({
        id: Joi.number(),
        image: Joi.string(),
        title: Joi.string()
    })
    return schema.validate(gallery);
};

const Gallery = mongoose.model("Gallery", gallerySchema);

//Client FeedBack

const clientFeedbackSchema = Schema({

    id: Number,
    fullname: String,
    avatar: String,
    textEn: String,
    textAz: String

})

const clientFeedbackValidate = (clientFeedback) => {
    const schema = new Joi.object({
        id: Joi.number(),
        avatar: Joi.string(),
        fullname: Joi.string(),
        textAz: Joi.string(),
        textEn: Joi.string()

    })
    return schema.validate(clientFeedback);
};

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);


module.exports = {
    PopularDestination, popularDestinationValidate,
    Gallery, galleryValidate,
    ClientFeedback, clientFeedbackValidate,
};