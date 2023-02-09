const Blog = require('../models/Blog')
const colors = require('colors')


// @desc    Get all blogs by user id
// @route   '/api/blogs
// @access  Private
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ createdBy: req.user.id })
        res.json(blogs)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Server Error')
    }
}

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, user: req.user.id })

        if(!blog) return res.status(404).json([
            {
                message: 'Blog not found',
                type: 'error'
            }
        ])
        res.json(blog)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

const createBlog = async (req, res) => {
    try {
        // Get post form data
        var { category, title, imageUrl, slugCustom, content } = req.body
        var slug

        // Temporary setup 
        imageUrl = "no-image.jpg"

        // Variables
        // Deprecated as of 1.1.6 - no need to find the slug in the database for uniqueness
        // We will handle being able to set up a custom slug later but now, it doesn't matter. 
        let Sl = await Blog.findOne({slug})

        // Used for front end messages
        let toasts = []
        
        // Validation
        //if (!category) toasts.push( {message: 'A Category is required', type: 'error'} )
        if (!title || title == "") toasts.push( {message: 'A Title is required', type: 'error'} )
        if (!imageUrl || imageUrl == "") toasts.push( {message: 'An image URL is required', type: 'error'} )
        //if (!slug || slug == "") toasts.push( {message: 'A slug is required', type: 'error'} )
        if (Sl) toasts.push( {message: `Slug (${slug}) must be unique`, type: 'error'} )
        if (!content || content == "") toasts.push( {message: 'Content is required', type: 'error'} )

        // - Version 1.1.7 - Create the slug automagically
        // Determine if slugCustom has been added and is not empty
        if (slugCustom && slugCustom != "") {
            // A custom slug has been entered
            // First set a variable to the title
            var slugRaw = slugCustom

            // Create the actual slug and replace spaces with - and put to lowercase
            slug = slugRaw.replace(/\s+/g, '-').toLowerCase()
        }
        else 
        {
            // No slug custom; use title
            // First set a variable to the title
            var slugRaw = title

            // Create the actual slug and replace spaces with - and put to lowercase
            slug = slugRaw.replace(/\s+/g, '-').toLowerCase()
        }
        // ----------------------------------------------------

        // Create blog object
        const newBlog = new Blog({
            title,
            imageUrl,
            slug,
            content,
            createdBy: req.user.id
        });
        
        await newBlog.save()

        if(!newBlog) return res.status(400).json([{ message: 'Blog not created', type: 'error' }]);

        res.json(newBlog)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, content }, { new: true });
        res.json(blog)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({
            blogId: req.params.id,
            toasts: [{ message: 'Blog deleted', type: 'success' }]
        })
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs,
    getBlogById
}