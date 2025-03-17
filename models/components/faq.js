const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');


const faqSchema = Schema({
    id: Number,
    questionAz: String,
    questionEn: String,
    answerAz: String,
    answerEn: String
})

const faqValidate = (faq) => {
    const schema = new Joi.object({
        id: Joi.number(),
        questionAz: Joi.string(),
        questionEn: Joi.string(),
        answerAz: Joi.string(),
        answerEn: Joi.string()

    })
    return schema.validate(faq);
};

const Faq = mongoose.model("Faq", faqSchema);

module.exports = { Faq, faqValidate};