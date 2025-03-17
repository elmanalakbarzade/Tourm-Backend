const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');


//Plan Your Trip With us
const plantripSchema = Schema({

    id: Number,
    images: [String],
    titleEn: String,
    titleAz: String,
    descriptionAz: String,
    descriptionEn: String,
    highlightstitleoneAz: String,
    highlightstitleoneEn: String,
    highlightsdesconeAz: String,
    highlightsdesconeEn: String,
    highlightstitletwoAz: String,
    highlightstitletwoEn: String,
    highlightsdesctwoAz: String,
    highlightsdesctwoEn: String,
    highlightstitlethreeAz: String,
    highlightstitlethreeEn: String,
    highlightsdescthreeAz: String,
    highlightsdescthreeEn: String,
    icons: [String],
    buttonUrl: String,

})

const plantripValidate = (plantrip) => {
    const schema = new Joi.object({
        id: Joi.number(),
        images: Joi.array(),
        titleAz: Joi.string(),
        titleEn: Joi.string(),
        descriptionAz: Joi.string(),
        descriptionEn: Joi.string(),
        highlightstitleoneAz: Joi.string(),
        highlightstitleoneEn: Joi.string(),
        highlightsdesconeAz: Joi.string(),
        highlightsdesconeEn: Joi.string(),
        highlightstitletwoAz: Joi.string(),
        highlightstitletwoEn: Joi.string(),
        highlightsdesctwoAz: Joi.string(),
        highlightsdesctwoEn: Joi.string(),
        highlightstitlethreeAz: Joi.string(),
        highlightstitlethreeEn: Joi.string(),
        highlightsdescthreeAz: Joi.string(),
        highlightsdescthreeEn: Joi.string(),
        icons: Joi.array(),
        buttonUrl: Joi.string()
    })
    return schema.validate(plantrip);
};

const Plantrip = mongoose.model("Plantrip", plantripSchema);






//Services We Offer

const offerSchema = Schema({

    id: Number,
    image: String,
    offerNameEn: String,
    offerNameAz: String,
    buttonUrl: String,
    countOffer: Number,
})

const offerValidate = (offer) => {
    const schema = new Joi.object({
        id: Joi.number(),
        image: Joi.string(),
        offerNameAz: Joi.string(),
        offerNameEn: Joi.string(),
        buttonUrl: Joi.string(),
        countOffer: Joi.number()
    })
    return schema.validate(offer);
};

const Offer = mongoose.model("Offer", offerSchema);


//Partners
const partnerSchema = Schema({

    id: Number,
    partnerImg: String,
    partnerUrl: String,
})

const partnerValidate = (partner) => {
    const schema = new Joi.object({
        id: Joi.number(),
        partnerImg: Joi.string(),
        partnerUrl: Joi.string()
    })
    return schema.validate(partner);
};

const Partner = mongoose.model("Partner", partnerSchema);


//Instagram Photos
const photoSchema = Schema({

    id: Number,
    image: String,
    imageUrl: String,
})

const photoValidate = (photo) => {
    const schema = new Joi.object({
        id: Joi.number(),
        image: Joi.string(),
        partnerImg: Joi.string(),
        partnerUrl: Joi.string()
    })
    return schema.validate(photo);
};
const Photo = mongoose.model("Photo", photoSchema);

module.exports = {
    Offer, offerValidate,
    Partner, partnerValidate,
    Photo, photoValidate,
    Plantrip, plantripValidate
};

