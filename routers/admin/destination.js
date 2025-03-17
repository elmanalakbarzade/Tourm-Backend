const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { destinationDelete, destinationEdit, destinationAdd, destinationList } = require('../../controllers/destination');



router.delete('/destination/:id', destinationDelete);
router.put('/destination/:id', upload.single('destImg'), destinationEdit);
router.post('/destination', upload.single('destImg'), destinationAdd);
router.get('/destination', destinationList);

module.exports = router;

