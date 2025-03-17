const express = require('express');
const router = express.Router();
const { faqEdit, faqDelete, faqAdd, faqList } = require('../../controllers/faq');



router.delete('/faq/:id', faqDelete);
router.put('/faq/:id', faqEdit);
router.post('/faq', faqAdd);
router.get('/faq', faqList);

module.exports = router;





