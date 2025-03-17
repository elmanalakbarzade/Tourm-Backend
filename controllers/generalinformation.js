const { GeneralInformation, generalInformationValidate } = require("../models/components/generalinformation");

exports.generalInformationList = async (req, res) => {
    const generalInformation = await GeneralInformation.find();
    res.status(200).send(generalInformation);
}


exports.generalInformationAdd = async (req, res) => {
    const { error } = generalInformationValidate(req.body);
    if (error) {
        res.send(error.message);
    } else {
        const generalInformation = new GeneralInformation(req.body);
        const result = await generalInformation.save();
        res.status(200).json(result);

    }
}

exports.generalInformationDelete = async (req, res) => {
    const generalInformation = await GeneralInformation.findByIdAndDelete(req.params.id);
    res.status(200).send(generalInformation);
}

exports.generalInformationEdit = async (req, res) => {
    const { error } = generalInformationValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const generalInformation = await GeneralInformation.findByIdAndUpdate(req.params.id, { ...req.body });
        await generalInformation.save();
        res.status(200).json(generalInformation);
    }
}

