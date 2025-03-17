const express = require('express');
const { generalInformationDelete, generalInformationEdit, generalInformationAdd, generalInformationList } = require('../../controllers/generalinformation');
const router = express.Router();



router.delete('/generalinformation/:id', generalInformationDelete);
router.put('/generalinformation/:id', generalInformationEdit);
router.post('/generalinformation', generalInformationAdd);
router.get('/generalinformation', generalInformationList);

module.exports = router;

