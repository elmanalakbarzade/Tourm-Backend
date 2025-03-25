const express = require('express');
const upload = require("../../middlewares/uploadFile");
const { generalInformationDelete, generalInformationEdit, generalInformationAdd, generalInformationList, generalInformationSingleList } = require('../../controllers/generalinformation');
const router = express.Router();



router.delete('/generalinformation/:id', generalInformationDelete);
router.put('/generalinformation/:id', upload.fields([{ name: "iconUrl", maxCount: 1 }, { name: "favicon", maxCount: 1 }]), generalInformationEdit);
router.post('/generalinformation', upload.fields([{ name: "iconUrl", maxCount: 1 }, { name: "favicon", maxCount: 1 }]), generalInformationAdd);
router.get('/generalinformation', generalInformationList);
router.get('/generalinformation/:id', generalInformationSingleList)

module.exports = router;

