const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { plantripAdd, plantripDelete, plantripEdit, plantripList, offerAdd, offerList, offerDelete, offerEdit, partnerDelete, partnerEdit, partnerAdd, partnerList, photoDelete, photoAdd, photoEdit, photoList } = require('../../controllers/about');


router.delete('/plantrip/:id', plantripDelete);
router.put('/plantrip/:id', upload.fields([{ name: "images", maxCount: 10 }, { name: "icons", maxCount: 10 }]), plantripEdit);
router.post('/plantrip', upload.fields([{ name: "images", maxCount: 10 }, { name: "icons", maxCount: 10 }]), plantripAdd);
router.get('/plantrip', plantripList);


router.delete('/offer/:id', offerDelete);
router.put('/offer/:id', upload.single('image'), offerEdit);
router.post('/offer', upload.single('image'), offerAdd);
router.get('/offer', offerList);


router.delete('/partner/:id', partnerDelete);
router.put('/partner/:id', upload.single('partnerImg'), partnerEdit);
router.post('/partner', upload.single('partnerImg'), partnerAdd);
router.get('/partner', partnerList);


router.delete('/photo/:id', photoDelete);
router.put('/photo/:id', upload.single('image'), photoEdit);
router.post('/photo', upload.single('image'), photoAdd);
router.get('/photo', photoList);



module.exports = router;




