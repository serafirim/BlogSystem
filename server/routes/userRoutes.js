// - Requires ------------------------------------------------------------
const express = require('express')
// -----------------------------------------------------------------------

// - Create our router ---------------------------------------------------
const router = express.Router()
const auth = require('../middleware/authMiddleware')
// ----------------------------------------------------------------------

// - Use the controller -------------------------------------------------
const {
    deleteUser,
    getProfile,
    getPublicProfile,
    loginUser,
    registerUser,
    updateUser
} = require('../controllers/userController')
// -----------------------------------------------------------------------

// - Route setup -----------------------------------------------------------
router.delete('/delete/:id', [auth], deleteUser)
router.get('/public/:id', getPublicProfile)
router.post('/login', loginUser)
router.get('/myprofile', [auth], getProfile)
router.put('/update/:id', [auth], updateUser)
router.post('/register', registerUser)

// ------------------------------------------------------------------------

// - Exports --------------------------------------------------------------
module.exports = router
// ------------------------------------------------------------------------