// - Requires ------------------------------------------------------------
const express = require('express')
// -----------------------------------------------------------------------

// - Create our router ---------------------------------------------------
const router = express.Router()
const auth = require('../middleware/authMiddleware')
// ----------------------------------------------------------------------

// - Use the controller -------------------------------------------------
const {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} = require('../controllers/blogController')
// -----------------------------------------------------------------------

// - Route setup -----------------------------------------------------------
router.get('/', [auth], getBlogs)

router.post('/', [auth], createBlog)

router.put('/:id', [auth], updateBlog);

router.delete('/:id', [auth], deleteBlog)

router.get('/:id', [auth], getBlogById)
// ------------------------------------------------------------------------

// - Exports --------------------------------------------------------------
module.exports = router
// ------------------------------------------------------------------------