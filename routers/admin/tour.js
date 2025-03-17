const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { tourAdd, tourDelete, tourEdit, tourList } = require('../../controllers/tour');

// Define routes for handling tour-related requests
router.delete('/tour/:id', tourDelete);
router.put('/tour/:id', upload.fields([{ name: "images", maxCount: 10 }]), tourEdit); // Handling multiple images upload
router.post('/tour', upload.fields([{ name: "images", maxCount: 10 }]), tourAdd);  // Handling multiple images upload
router.get('/tour', tourList);  // Fetching list of all tours

module.exports = router;
