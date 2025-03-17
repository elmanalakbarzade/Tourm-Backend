const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const {galleryDelete, galleryEdit, galleryAdd, galleryList, clientFeedbackDelete, clientFeedbackEdit, clientFeedbackAdd, clientFeedbackList, popularDestinationDelete, popularDestinationEdit, popularDestinationAdd, popularDestinationList } = require('../../controllers/homepage');


router.delete('/populardestination/:id', popularDestinationDelete);
router.put('/populardestination/:id',upload.single('image'), popularDestinationEdit);
router.post('/populardestination',upload.single('image'), popularDestinationAdd);
router.get('/populardestination', popularDestinationList);


router.delete('/gallery/:id', galleryDelete);
router.put('/gallery/:id', upload.single('image'),galleryEdit);
router.post('/gallery', upload.single('image'),galleryAdd);
router.get('/gallery', galleryList);


router.delete('/clientfeedback/:id', clientFeedbackDelete);
router.put('/clientfeedback/:id', upload.single('avatar'),clientFeedbackEdit);
router.post('/clientfeedback',upload.single('avatar'), clientFeedbackAdd);
router.get('/clientfeedback', clientFeedbackList);



module.exports = router;




