// - Requires ------------------------------------------------------------
const express = require('express')
// -----------------------------------------------------------------------

// - Create our router ---------------------------------------------------
const router = express.Router()
const auth = require('../middleware/authMiddleware')
// ----------------------------------------------------------------------

// - Use the controller -------------------------------------------------
const {
    createPage,
    updatePage,
    deletePage,
    getPageById
} = require('../controllers/pageController')
// -----------------------------------------------------------------------

// - Route setup -----------------------------------------------------------
router.post('/create', [auth], createPage)

router.put('/update/:id', [auth], updatePage);

router.delete('/delete/:id', [auth], deletePage)

router.get('/:id', getPageById)
// ------------------------------------------------------------------------

// - Exports --------------------------------------------------------------
module.exports = router
// ------------------------------------------------------------------------