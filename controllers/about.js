const { Offer, Partner, Photo, offerValidate, partnerValidate, photoValidate, Plantrip, plantripValidate } = require('../models/components/about.js');
const { deleteSingleOldImage, deleteManyOldImage } = require('../utils/deleteOldImage');
//plan trip

exports.plantripList = async (req, res) => {
    const plantrips = await Plantrip.find();
    res.status(200).send(plantrips);
};

exports.plantripAdd = async (req, res) => {
    const { error } = plantripValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    const plantrip = new Plantrip(req.body);

    if (filesObjLength > 0) {
        const uploadImages = [];
        const uploadIcons = [];

        if (req.files.images) {
            req.files.images.forEach(item => uploadImages.push(item.path));
        }

        if (req.files.icons) {
            req.files.icons.forEach(item => uploadIcons.push(item.path));
        }

        plantrip.images = uploadImages;
        plantrip.icons = uploadIcons;
    }

    const result = await plantrip.save();
    res.status(201).send(result);
};

exports.plantripEdit = async (req, res) => {
    const { error } = plantripValidate(req.body);
    const paramsId = req.params.id;
    if (error) {
        return res.status(400).send(error.message);
    }

    let plantrip = await Plantrip.findById(paramsId);
    if (!plantrip) {
        return res.status(404).send("No Data");
    }

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    if (filesObjLength > 0) {
        deleteManyOldImage(plantrip.images);
        deleteManyOldImage(plantrip.icons);

        const uploadImages = [];
        const uploadIcons = [];

        if (req.files.images) {
            req.files.images.forEach(item => uploadImages.push(item.path));
        }

        if (req.files.icons) {
            req.files.icons.forEach(item => uploadIcons.push(item.path));
        }

        plantrip.images = uploadImages;
        plantrip.icons = uploadIcons;
    }

    plantrip = await Plantrip.findByIdAndUpdate(paramsId, req.body, { new: true });
    await plantrip.save();
    res.status(200).json(plantrip);
};

exports.plantripDelete = async (req, res) => {
    const plantrip = await Plantrip.findByIdAndDelete(req.params.id);
    if (!plantrip) {
        return res.status(404).send("No Data");
    }

    deleteManyOldImage(plantrip.images);
    deleteManyOldImage(plantrip.icons);

    res.status(200).send(plantrip);
};



// Offer
exports.offerList = async (req, res) => {
    const offer = await Offer.find();
    res.status(200).send(offer);
}

exports.offerAdd = async (req, res) => {
    const { error } = offerValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const offer = new Offer(req.body);
            offer.image = req.file.path;
            result = await offer.save();
        } else {
            const offer = new Offer(req.body);
            result = await offer.save();
        }
        res.status(201).send(result);
    }

}

exports.offerEdit = async (req, res) => {
    const { error } = offerValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const offer = await Offer.findById(req.params.id);

        if (!offer) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const offer = await Offer.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await offer.save();

                res.status(200).json(offer);
            } else {
                const offer = await Offer.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(offer.image);
                offer.image = req.file.path;

                await offer.save();

                res.status(200).json(offer);

            }
        }
    }
}


exports.offerDelete = async (req, res) => {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(offer);
}

// Partner
exports.partnerList = async (req, res) => {
    const partner = await Partner.find();
    res.status(200).send(partner);
}

exports.partnerAdd = async (req, res) => {
    const { error } = partnerValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const partner = new Partner(req.body);
            partner.partnerImg = req.file.path;
            result = await partner.save();
        } else {
            const partner = new Partner(req.body);
            result = await partner.save();
        }
        res.status(201).send(result);
    }

}

exports.partnerEdit = async (req, res) => {
    const { error } = partnerValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const partner = await Partner.findById(req.params.id);

        if (!partner) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const partner = await Partner.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await partner.save();

                res.status(200).json(partner);
            } else {
                const partner = await Partner.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(partner.partnerImg);
                partner.partnerImg = req.file.path;

                await partner.save();

                res.status(200).json(partner);

            }
        }
    }
}


exports.partnerDelete = async (req, res) => {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(partner);
}


//Photos

exports.photoList = async (req, res) => {
    const photo = await Photo.find();
    res.status(200).send(photo);
}

exports.photoAdd = async (req, res) => {
    const { error } = photoValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const photo = new Photo(req.body);
            photo.image = req.file.path;
            result = await photo.save();
        } else {
            const photo = new Photo(req.body);
            result = await photo.save();
        }
        res.status(201).send(result);
    }

}

exports.photoEdit = async (req, res) => {
    const { error } = photoValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const photo = await photo.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await photo.save();

                res.status(200).json(photo);
            } else {
                const photo = await Photo.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(photo.image);
                photo.image = req.file.path;

                await photo.save();

                res.status(200).json(photo);

            }
        }
    }
}


exports.photoDelete = async (req, res) => {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!clientFeedback) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(photo);
}
