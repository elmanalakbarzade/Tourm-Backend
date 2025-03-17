const { Blog, blogValidate, Blogcategory, blogcategoryValidate, Blogcomment, blogcommentValidate, RecentPosts, recentPostsValidate } = require("../models/components/blog");
const { deleteSingleOldImage } = require('../utils/deleteOldImage');

//Blog Details

exports.blogList = async (req, res) => {
    const blog = await Blog.find().populate('categories');
    res.status(200).send(blog);
}

exports.blogAdd = async (req, res) => {
    const { error } = blogValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const blog = new Blog(req.body);
            blog.imageUrl = req.file.path;
            result = await blog.save();
        } else {
            const blog = new Blog(req.body);
            result = await blog.save();
        }
        res.status(201).send(result);
    }

}

exports.blogEdit = async (req, res) => {
    const { error } = blogValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const blog = await Blog.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await blog.save();

                res.status(200).json(blog);
            } else {
                const blog = await Blog.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(blog.imageUrl);
                blog.imageUrl = req.file.path;

                await blog.save();

                res.status(200).json(blog);

            }
        }
    }
}


exports.blogDelete = async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(blog);
}


//Blog Category 


exports.blogcategoryList = async (req, res) => {
    const blogcategory = await Blogcategory.find();
    res.status(200).send(blogcategory);
}


exports.blogcategoryAdd = async (req, res) => {
    const { error } = blogcategoryValidate(req.body);
    if (error) {
        res.send(error.message);
    } else {
        const blogcategory = new Blogcategory(req.body);
        const result = await blogcategory.save();
        res.status(200).json(result);

    }
}

exports.blogcategoryEdit = async (req, res) => {
    const { error } = blogcategoryValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const blogcategory = await Blogcategory.findByIdAndUpdate(req.params.id, { ...req.body });
        await faq.save();
        res.status(200).json(blogcategory);
    }
}

exports.blogcategoryDelete = async (req, res) => {
    const blogcategory = await Blogcategory.findByIdAndDelete(req.params.id);
    res.status(200).send(blogcategory);
}


// blog Comment

exports.blogcommentList = async (req, res) => {
    const blogcomment = await Blogcomment.find();
    res.status(200).send(blogcomment);
}


exports.blogcommentAdd = async (req, res) => {
    const { error } = blogcommentValidate(req.body);
    if (error) {
        res.send(error.message);
    } else {
        const blogcomment = new Blogcomment(req.body);
        const result = await blogcomment.save();
        res.status(200).json(result);

    }
}

exports.blogcommentEdit = async (req, res) => {
    const { error } = blogcommentValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const blogcomment = await Blogcomment.findByIdAndUpdate(req.params.id, { ...req.body });
        await faq.save();
        res.status(200).json(blogcomment);
    }
}

exports.blogcommentDelete = async (req, res) => {
    const blogcomment = await Blogcomment.findByIdAndDelete(req.params.id);
    res.status(200).send(blogcomment);
}


// Recent Posts

exports.recentpostsList = async (req, res) => {
    const recentposts = await RecentPosts.find();
    res.status(200).send(recentposts);
}

exports.recentpostsAdd = async (req, res) => {
    const { error } = recentPostsValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const recentposts = new RecentPosts(req.body);
            recentposts.image = req.file.path;
            result = await recentposts.save();
        } else {
            const recentposts = new RecentPosts(req.body);
            result = await recentposts.save();
        }
        res.status(201).send(result);
    }

}

exports.recentpostsEdit = async (req, res) => {
    const { error } = recentPostsValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const recentposts = await RecentPosts.findById(req.params.id);

        if (!recentposts) {
            return res.status(404).send("No Data");
        } else {

            if (!req.file) {
                const recentposts = await RecentPosts.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await recentposts.save();

                res.status(200).json(recentposts);
            } else {
                const recentposts = await RecentPosts.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(recentposts.image);
                recentposts.image = req.file.path;

                await recentposts.save();

                res.status(200).json(recentposts);

            }
        }
    }
}


exports.recentpostsDelete = async (req, res) => {
    const recentposts = await RecentPosts.findByIdAndDelete(req.params.id);
    if (!recentposts) {
        return res.status(404).send("No Data");
    }
    res.status(200).send(recentposts);
}
