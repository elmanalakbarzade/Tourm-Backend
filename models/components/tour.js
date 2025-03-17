const mongoose = require("mongoose");
const Joi = require("joi");

const tourSchema = new mongoose.Schema(
    {
        id: { type: Number },
        titleEn: { type: String, required: true, trim: true },
        titleAz: { type: String, required: true, trim: true },
        duration: { type: String, required: true },
        images: [{ type: String }],
        tripInfo: {
            accommodationEn: { type: String },
            accommodationAz: { type: String },
            departureCityEn: { type: String },
            departureCityAz: { type: String },
            arrivalCityEn: { type: String },
            arrivalCityAz: { type: String },
            bestSeasonEn: { type: String },
            bestSeasonAz: { type: String },
            guideEn: { type: String },
            guideAz: { type: String },
            language: { type: String },
            mealsEn: { type: String },
            mealsAz: { type: String },
            tourAvailabilityEn: { type: String },
            tourAvailabilityAz: { type: String },
            transportationEn: { type: String },
            transportationAz: { type: String },
            walkingHoursEn: { type: String },
            walkingHoursAz: { type: String },
            minimumAge: { type: Number },
            maximumAge: { type: Number },
            tripTypeEn: { type: String },
            tripTypeAz: { type: String },
            originalprice: { type: Number },
            discountedprice: { type: Number },
            discount: { type: Number }
        },
        destination: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
        activity: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
        overview: {
            titleEn: { type: String },
            titleAz: { type: String },
            descriptionEn: { type: String },
            descriptionAz: { type: String },
        },
        itinerary: {
            titleEn: { type: String },
            titleAz: { type: String },
            descriptionEn: { type: String },
            descriptionAz: { type: String },
        },
        cost: {
            titleEn: { type: String },
            titleAz: { type: String },
            descriptionEn: { type: String },
            descriptionAz: { type: String },
        },
        rating: { type: Number, default: 4.5, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const tourValidate = (tour) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        titleEn: Joi.string().required(),
        titleAz: Joi.string().required(),
        duration: Joi.string().required(),
        images: Joi.array().items(Joi.string()),
        tripInfo: Joi.object({
            accommodationEn: Joi.string(),
            accommodationAz: Joi.string(),
            departureCityEn: Joi.string(),
            departureCityAz: Joi.string(),
            arrivalCityEn: Joi.string(),
            arrivalCityAz: Joi.string(),
            bestSeasonEn: Joi.string(),
            bestSeasonAz: Joi.string(),
            guideEn: Joi.string(),
            guideAz: Joi.string(),
            language: Joi.string(),
            mealsEn: Joi.string(),
            mealsAz: Joi.string(),
            tourAvailabilityEn: Joi.string(),
            tourAvailabilityAz: Joi.string(),
            transportationEn: Joi.string(),
            transportationAz: Joi.string(),
            walkingHoursEn: Joi.string(),
            walkingHoursAz: Joi.string(),
            minimumAge: Joi.number(),
            maximumAge: Joi.number(),
            tripTypeEn: Joi.string(),
            tripTypeAz: Joi.string(),
            originalprice: Joi.number(),
            discountedprice: Joi.number(),
            discount: Joi.number()
        }),
        activity: Joi.string(), // At least one activity
        destination:  Joi.string(), // At least one destination
        overview: Joi.object({
            titleEn: Joi.string(),
            titleAz: Joi.string(),
            descriptionEn: Joi.string(),
            descriptionAz: Joi.string(),
        }),
        itinerary: Joi.object({
            titleEn: Joi.string(),
            titleAz: Joi.string(),
            descriptionEn: Joi.string(),
            descriptionAz: Joi.string(),
        }),
        cost: Joi.object({
            titleEn: Joi.string(),
            titleAz: Joi.string(),
            descriptionEn: Joi.string(),
            descriptionAz: Joi.string(),
        }),
        rating: Joi.number().min(1).max(5),
    });

    return schema.validate(tour);
};

module.exports = { Tour: mongoose.model("Tour", tourSchema), tourValidate };
