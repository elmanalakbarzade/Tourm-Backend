const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { activityAdd, activityDelete, activityEdit, activityList } = require('../../controllers/activity');



router.delete('/activity/:id', activityDelete);
router.put('/activity/:id', upload.single('actImg'), activityEdit);
router.post('/activity', upload.single('actImg'), activityAdd);
router.get('/activity', activityList);

module.exports = router;

