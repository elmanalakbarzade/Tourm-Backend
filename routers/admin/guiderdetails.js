const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { guiderDetailsAdd, guiderDetailsDelete, guiderDetailsEdit, guiderDetailsList } = require('../../controllers/guiderdetails');


router.delete('/guiderDetails/:id', guiderDetailsDelete);
router.put('/guiderDetails/:id', upload.single('avatar'), guiderDetailsEdit);
router.post('/guiderDetails', upload.single('avatar'), guiderDetailsAdd);
router.get('/guiderDetails', guiderDetailsList);


module.exports = router;




