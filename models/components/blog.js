const { default: mongoose, Schema } = require("mongoose");
const Joi = require('joi');

//Blog Details

const blogSchema = Schema({
    id: Number,
    titleAz: String,
    titleEn: String,
    contentAz: String,
    contentEn: String,
    createdAt: { type: Date, default: Date.now },
    imageUrl: String,
    author: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Blogcategory" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Blogcomment" }],
    isActive: { type: Boolean, default: true },

})

const blogValidate = (blog) => {
    const schema = new Joi.object({
        id: Joi.number(),
        titleAz: Joi.string(),
        titleEn: Joi.string(),
        contentAz: Joi.string(),
        contentEn: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        imageUrl: Joi.string(),
        author: Joi.string(),
        categories: Joi.string(),
        comments: Joi.string(),
        isActive: Joi.boolean()


    })
    return schema.validate(blog);
};

const Blog = mongoose.model("Blog", blogSchema);

// Blog Category Schema

const blogcategorySchema = Schema({
    nameAz: String,
    nameEn: String,
    catCount: Number,

})

const blogcategoryValidate = (blogcategory) => {
    const schema = new Joi.object({
        nameAz: Joi.string(),
        nameEn: Joi.string(),
        catCount: Joi.number()
    })
    return schema.validate(blogcategory);

};
const Blogcategory = mongoose.model("Blogcategory", blogcategorySchema);

//Comment Schema

const blogcommentSchema = Schema({

    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false },
})
const blogcommentValidate = (blogcomment) => {
    const schema = new Joi.object({
        user: Joi.string().required(),
        content: Joi.string(),
        createdAt: Joi.date(),
        isApproved: Joi.boolean(),
    })
    return schema.validate(blogcomment);

}
const Blogcomment = mongoose.model("Blogcomment", blogcommentSchema);

//Recent Posts Schema
const recentPostsSchema = Schema({
    titleAz: String,
    titleEn: String,
    image: String,
    createdAt: Date,
})
const recentPostsValidate = (recentPosts) => {
    const schema = new Joi.object({
        titleAz: Joi.string(),
        titleEn: Joi.string(),
        image: Joi.string(),
        createdAt: Joi.date(),
    })
    return schema.validate(recentPosts);
}
const RecentPosts = mongoose.model("RecentPosts", recentPostsSchema);


module.exports = {
    Blog, blogValidate,
    Blogcategory, blogcategoryValidate,
    Blogcomment, blogcommentValidate,
    RecentPosts, recentPostsValidate
};



