const express = require("express");
const { popularDestinationList, galleryList, clientFeedbackList } = require("../../controllers/homepage.js");
const { guiderDetailsList } = require("../../controllers/guiderdetails.js");
const { activityList } = require("../../controllers/activity.js");
const { plantripList, offerList, partnerList, photoList } = require("../../controllers/about.js");
const { faqList } = require("../../controllers/faq.js");
const { blogcategoryList, blogList, blogcommentList, recentpostsList } = require("../../controllers/blog.js");
const { generalInformationList } = require("../../controllers/generalinformation.js");
const { tourList, tourListForActivity, tourListForDestination } = require("../../controllers/tour.js");
const { destinationList } = require("../../controllers/destination.js");

router.get('/', (req, res) => {
    res.send("Welcome to the Tourism API from Surface Route!");
});
const router = express.Router();

router.get("/populardestination", popularDestinationList);
router.get("/gallery", galleryList);
router.get('/clientfeedback', clientFeedbackList);
router.get('/guiderDetails', guiderDetailsList);
router.get("/activity", activityList);
router.get('/plantrip', plantripList);
router.get("/offer", offerList);
router.get("/partner", partnerList);
router.get("/photo", photoList);
router.get("/faq", faqList)
router.get('/blog', blogList);
router.get('/blogcategory', blogcategoryList);
router.get('/blogcomment', blogcommentList);
router.get('/recentposts', recentpostsList);
router.get('/generalinformation', generalInformationList);
router.get('/tour', tourList);
router.get('/destination', destinationList);
router.get("/tour/activity/:id", tourListForActivity);
router.get("/tour/destination/:id", tourListForDestination);




module.exports = router;
