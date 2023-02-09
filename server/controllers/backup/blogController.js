// - Requires
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const colors = require("colors")
const Story = require("../models/Story")
const Category = require("../models/Category")
// ------------------------------------------------------------------

// @route   POST api/v1/story/:id
// @desc    Create story
// @access  Private
const createStory = async (req, res, next) => {
    try {
        // Get body content
        var { category, title, imageUrl, slugCustom, content } = req.body

        //const categ = await Category.find().populate(category)

        imageUrl = "no-image.jpg"

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

        // Variables
        // Deprecated as of 1.1.6 - no need to find the slug in the database for uniqueness
        // We will handle being able to set up a custom slug later but now, it doesn't matter. 
        let Sl = await Story.findOne({slug})

        // Used for front end messages
        let toasts = []

        // Validation
        //if (!category) toasts.push( {message: 'A Category is required', type: 'error'} )
        if (!title || title == "") toasts.push( {message: 'A Title is required', type: 'error'} )
        if (!imageUrl || imageUrl == "") toasts.push( {message: 'An image URL is required', type: 'error'} )
        //if (!slug || slug == "") toasts.push( {message: 'A slug is required', type: 'error'} )
        if (Sl) toasts.push( {message: `Slug (${slug}) must be unique`, type: 'error'} )
        if (!content || content == "") toasts.push( {message: 'Content is required', type: 'error'} )

        // Send toasts
        if (toasts.length > 0) return res.status(400).json({toasts})

        // Create story object
        const newStory = new Story({
   //         category, 
            title,
            imageUrl,
            slug,
            content,
            createdBy: req.user.id
        })

        // Save to db
        const story = await newStory.save()

        if (!story) return res.status(400).json({ message: 'Story not created', type: 'error'})

        res.json(story)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/story/:id
// @desc    Delete story by id
// @access  Private
const deleteStory = async (req, res, next) => {
    try {
        // get from the body
        //res.send('deleting story')
        // Determine if the story is owned by the token user
        var storyOwner = await Story.findOne({ _id: req.params.id})

        if (storyOwner) {
            // Set the owner of the story
            storyOwner = storyOwner.createdBy.toString()

            //console.log('TokenUser: ', req.user.id)
            //console.log('StoryOwner: ', storyOwner)

            // Determine if storyOwner and tokenuser are one in the same
            if (storyOwner == req.user.id) {
                var StoryOwned = true
            }
            else
            {
                var StoryOwned = false
            }
            //var StoryOwned = false

            if (StoryOwned)
            {
                const story = await Story.findOneAndDelete({ _id: req.params.id })

                res.json({ message: 'Successfully Deleted Story', type: 'success'})
            }
            else 
            {
                res.json({ message: `Cannot delete a story that you don't own`, type: 'error'})
            }        
        }
        else 
        {
            res.json({ message: `Story does not exist`, type: 'error'})
        }

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/story/:id
// @desc    Get story by id
// @access  Public
const getStory = async (req, res, next) => {
    try {
        const story = await Story.find({ _id: req.params.id})
        res.json(story)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/story/update/:id
// @desc    Update story by id
// @access  Private
const updateStory = async (req, res, next) => {
    try {
        // get from the body
        const { category, title, imageUrl, slug, body } = req.body

        // Determine if the story is owned by the token user
        var storyOwner = await Story.findOne({ _id: req.params.id})

        if (storyOwner) {
            // Set the owner of the story
            storyOwner = storyOwner.createdBy.toString()

            //console.log('TokenUser: ', req.user.id)
            //console.log('StoryOwner: ', storyOwner)

            // Determine if storyOwner and tokenuser are one in the same
            if (storyOwner == req.user.id) {
                var StoryOwned = true
            }
            else
            {
                var StoryOwned = false
            }
            //var StoryOwned = false

            if (StoryOwned)
            {
                const story = await Story.findOneAndUpdate({ _id: req.params.id }, { category, title, imageUrl, slug, body }, { new: true })

                res.json({ message: 'Successfully Updated Story', type: 'success'})
            }
            else 
            {
                res.json({ message: `Cannot update a story that you don't own`, type: 'error'})
            }        

            //res.json(Story)
        }
        else 
        {
            res.json({ message: `Story does not exist`, type: 'error'})
        }

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// - Functions
const generateSlug = (title) => {
    const slugText = title.toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
 
    return slugText
}
// ----------------------------------------------------------

// - Export for usage
module.exports = {
    createStory,
    deleteStory,
    getStory,
    updateStory,
}