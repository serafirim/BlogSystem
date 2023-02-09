const Page = require('../models/Page')
const colors = require('colors')

// @desc    Get page by :id
// @route   '/api/v1/page/:id
// @access  Public
const getPageById = async (req, res) => {
    try {
        const pageBy = await Page.findOne(
            { 
                $or: [
                     { slug: req.params.id }
                ] 
            }
        )

        if(!pageBy) return res.status(404).json([
            {
                message: 'Page not found',
                type: 'error'
            }
        ])
        res.json(pageBy)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

// @desc    Create a page
// @route   '/api/v1/page/create
// @access  Private
const createPage = async (req, res) => {
    try {
        // Get post form data
        var { category, title, imageUrl, slugCustom, content } = req.body
        var slug

        // Temporary setup 
        imageUrl = "no-image.jpg"

        // Variables
        // Deprecated as of 1.1.6 - no need to find the slug in the database for uniqueness
        // We will handle being able to set up a custom slug later but now, it doesn't matter. 
        let Sl = await Page.findOne({slug})

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

        // Create page object
        const newPage = new Page({
            title,
            imageUrl,
            slug,
            content,
            createdBy: req.user.id
        });
        
        await newPage.save()

        if(!newPage) return res.status(400).json([{ message: 'Page not created', type: 'error' }]);

        res.json(newPage)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

// @desc    Update a page
// @route   '/api/v1/page/update/:id
// @access  Private
const updatePage = async (req, res) => {
    try {
        const { title, content } = req.body;
        const page = await Page.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, content }, { new: true });
        res.json(page)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

// @desc    Delete a page
// @route   '/api/v1/page/delete/:id
// @access  Private
const deletePage = async (req, res) => {
    try {
        const page = await Page.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({
            pageId: req.params.id,
            toasts: [{ message: 'Page deleted', type: 'success' }]
        })
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error')
    }
}

module.exports = {
    deletePage,
    updatePage,
    createPage,
    getPageById
}