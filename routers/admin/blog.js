const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadFile");
const { blogDelete, blogEdit, blogAdd, blogList, blogcategoryDelete, blogcategoryEdit, blogcategoryAdd, blogcategoryList, blogcommentDelete, blogcommentAdd, blogcommentList, recentpostsDelete, recentpostsEdit, recentpostsAdd, recentpostsList, blogcommentEdit } = require('../../controllers/blog');


router.delete('/blog/:id', blogDelete);
router.put('/blog/:id', upload.single('imageUrl'), blogEdit);
router.post('/blog', upload.single('imageUrl'), blogAdd);
router.get('/blog', blogList);

router.delete('/blogcategory/:id', blogcategoryDelete);
router.put('/blogcategory/:id', blogcategoryEdit);
router.post('/blogcategory', blogcategoryAdd);
router.get('/blogcategory', blogcategoryList);

router.delete('/blogcomment/:id', blogcommentDelete);
router.put('/blogcomment/:id', blogcommentEdit);
router.post('/blogcomment', blogcommentAdd);
router.get('/blogcomment', blogcommentList);

router.delete('/recentposts/:id', recentpostsDelete);
router.put('/recentposts/:id', upload.single('image'), recentpostsEdit);
router.post('/recentposts', upload.single('image'), recentpostsAdd);
router.get('/recentposts', recentpostsList);


module.exports = router;