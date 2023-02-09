const Page = require('../models/Page')
const colors = require('colors')


// @desc    Get all pages that id has created
// @route   '/api/v1/pages
// @access  Private
const getPages = async (req, res) => {
    try {
        const pages = await Page.find({ createdBy: req.user.id })
        res.json(pages)
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Server Error')
    }
}

module.exports = {
    getPages,
}