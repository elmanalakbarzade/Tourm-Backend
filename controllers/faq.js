const { Faq, faqValidate } = require('../models/components/faq');


exports.faqList = async (req, res) => {
    const faq = await Faq.find();
    res.status(200).send(faq);
}


exports.faqAdd = async (req, res) => {
    const { error } = faqValidate(req.body);
    if (error) {
        res.send(error.message);
    } else {
        const faq = new Faq(req.body);
        const result = await faq.save();
        res.status(200).json(result);

    }
}

exports.faqDelete = async (req, res) => {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    res.status(200).send(faq);
}

exports.faqEdit = async (req, res) => {
    const { error } = faqValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const faq = await Faq.findByIdAndUpdate(req.params.id, { ...req.body });
        await faq.save();
        res.status(200).json(faq);
    }
}

