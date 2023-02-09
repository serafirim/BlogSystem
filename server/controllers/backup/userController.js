// - Requires
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const colors = require("colors")
// ------------------------------------------------------------------

// @route   POST api/v1/user/delete/:id
// @desc    Delete user by id
// @access  Private
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        if(userId !== req.user.id){
            return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}]);
        }

        let user = await User.findOneAndDelete({_id: userId});

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);

        res.json(user);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');       
    }
}

// @route   GET api/v1/user/myprofile
// @desc    Get user profile
// @access  Private
const getMyProfile = async (req, res) => {
    try {
        //res.send('Get profile for user')
        const user = await User.findById({ _id: req.user.id })
        .select('-password')
        .select('-createdAt')
        .select('-updatedAt')
        .select('-__v')

        // If user doesn't exist
        if (!user) return res.status(404).json({message: 'User does not exist', type: 'error'})

        // return user
        res.json(user)
        
    } catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   GET api/v1/user/public/:id
// @desc    Get user profile
// @access  Public
const getPublicProfile = async (req, res) => {
    try {
        //res.send('Get profile for user')
        let user = await User.findById({ _id: req.params.id })

        if (user.isPrivate){
            // User is private
            user = await User.findById({ _id: req.params.id })
                .select('-password')
                .select('-createdAt')
                .select('-updatedAt')
                .select('-__v')
                .select('-verificationCode')
                .select('-isEmailVerified')
                .select('-passwordResetCode')
                .select('-isPrivate')
                .select('-firstName')
                .select('-lastName')
                .select('-email')
        }
        else 
        {
            // Use is not private
            user = await User.findById({ _id: req.params.id })
                .select('-password')
                .select('-createdAt')
                .select('-updatedAt')
                .select('-__v')
                .select('-verificationCode')
                .select('-isEmailVerified')
                .select('-passwordResetCode')
                .select('-isPrivate')
        }

        // If user doesn't exist
        if (!user) return res.status(404).json({message: 'User does not exist', type: 'error'})

        // return user
        res.json(user)
        
    } catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/user/login
// @desc    Login a user
// @access  Public
const loginUser = async (req, res) => {
    try {
        //res.send('Login a user')
        const { userNameEmail, password } = req.body

        // Used for front end messages
        let toasts = []

        // Variables
        let UsingUs = false
        let UsingEm = false
        let Using = ""
        let UsingCred


        // - Validate information ---------------------------------------------------------------------------------
        // Check for blanks
        if (!userNameEmail) toasts.push( {message: 'Username/Email cannot be blank', type: 'error'} )
        if (!password) toasts.push( {message: 'Password cannot be blank', type: 'error'} )

        // Check in db for username/email
        var FindByUser = await User.findOne({userName: userNameEmail})
        var FindByEmail = await User.findOne({email: userNameEmail})

        // If either of those above fail, send error message
        if (!FindByUser && !FindByEmail) toasts.push( {message: `User/Email (${userNameEmail}) doesn't exist`, type: 'error'} )

        // = Check for password match ===============================================================================
        // by username
        if (FindByUser) {
            // Match the password from the db
            // Do errorcheck
            if (!MatchPassword) toasts.push({message: 'Invalid password', type: 'error'})
            var MatchPassword = await bcrypt.compare(password, FindByUser.password)
            
            // Set a FoundBy variable
            var FoundBy = FindByUser
        }

        // by email
        if (FindByEmail) {
            // Match the password from the db
            var MatchPassword = await bcrypt.compare(password, FindByEmail.password)

            // Set a FoundBy variable
            var FoundBy = FindByEmail
        }
        // ========================================================================================================

        // OLD
        // Check for correct password
        //const MatchPassword = await bcrypt.compare(password, password)
        //if (!MatchPassword) toasts.push({message: 'Invalid password', type: 'error'})
        // --------------------------------------------------------------------------------------------------------
        /*
        if(validateEmail(userNameEmail))
            UsingEm = true
        else
            UsingUs = true

        if (UsingUs) {
            Using = "username"
            var Find = await User.findOne({userName: userNameEmail})
        }        

        if (UsingEm) {
            
            if (!validateEmail(userNameEmail)) toasts.push( {message: 'A Valid Email is required', type: 'error'} )
            Using = "email"
            var Find = await User.findOne({email: userNameEmail})
        }

        UsingCred = userNameEmail

        if (!Find) toasts.push( {message: `User with ${Using} (${UsingCred}) doesn't exist`, type: 'error'} )
        */

        // - Do toasting, signing, and auth things ------------------------------------------------------------------
        if (toasts.length > 0) 
        {
            return res.status(400).json({toasts})
        }
        else 
        {
            // -- send json web token
            const payload = {
                user: {
                    id: FoundBy._id
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400 // save for a day
            }, (err, token) => {
                if (err) throw err
                res.json({token})
                console.log(token)
            })
            // ----------------------------------------------------
            
            // Send json
            //res.json(req.body)
        }
        // ------------------------------------------------------------------------------------------------
    } catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/user/register
// @desc    Register a user
// @access  Public
const registerUser = async (req, res) => {
    try {
        //res.send('Register a user')
        const { firstName, lastName, userName, email, image, role, password, verificationCode, isEmailVerified, passwordResetCode } = req.body
        
        // Used for front end messages
        let toasts = []

        // Variables
        

        // Validate information
        if (!firstName) toasts.push( {message: 'First name is required', type: 'error'} )
        if (!lastName) toasts.push( {message: 'Last name is required', type: 'error'} )
        
        if (!userName) toasts.push( {message: 'Username is required', type: 'error'} )
        if (Us) toasts.push( {message: 'User already exists', type: 'error'} )

        if (!email || !validateEmail(email)) toasts.push( {message: 'A Valid Email is required', type: 'error'} )
        if (Em) toasts.push( {message: 'Email is already being used', type: 'error'} )

        if (!password) toasts.push( {message: 'Password is required', type: 'error'} )
        if (password && (password.length < 8 || password.length > 12)) toasts.push( {message: 'Password must be 8 to 12 characters long', type: 'error'} )

        // Send toasts
        if (toasts.length > 0) 
        {
            return res.status(400).json({toasts})
        } 
        else
        {
            // -- Send new user to db
            Us = new User(req.body)

            // hash the password before saving to db
            const salt = await bcrypt.genSalt(10)

            // Set new password
            Us.password = await bcrypt.hash(password, salt)

            await Us.save()
            // ----------------------------------------------

            // -- send json web token
            const payload = {
                user: {
                    id: Us._id
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400 // save for a day
            }, (err, token) => {
                if (err) throw err
                res.json({token})
            })
            // ----------------------------------------------------
            
            // this sends the json data
            //res.json(Us)
        }
    } catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

// @route   POST api/v1/user/update/:id
// @desc    Update user by id
// @access  Private
const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id
        var IsCurrentEmail = false

        // Get user
        var user = await User.findById({ _id: req.params.id })
        const currentUser = await User.findById({ _id: req.user.id })

        // Check to see if this is the correct user
        //if(userId !== req.params.id){
        //    return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}]);
        //}

        // hash the password before saving to db
        const salt = await bcrypt.genSalt(10)

        // Set new password
        req.body.password = await bcrypt.hash(req.body.password, salt)

        // Find the updated email in db
        var Em = await User.findOne({ email: req.body.email})

        // Make sure updated email is not the same as the user's email
        if (user.email == req.body.email) {
            IsCurrentEmail = true
        }

        // Version 1.3.2 - Add checking for email already in db
        var DoUpdate = false
        if (Em)
        {
            // Check for current email
            if (IsCurrentEmail)
            {
                DoUpdate = true
            }
            else 
            {
                return res.status(400).json([{message: `The email (${req.body.email}) is already being used.`, type: 'error'}])
            }            
        }
        else 
        {
            
        }

        if (DoUpdate)
        {
            // Do the update!
            user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        }

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);

        res.json(user);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');       
    }
}

// - Functions ----------------------------------------------------
function validateEmail(email) {
    const regex =/\S+@\S+\.\S+/
    
    // validemail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email)
}
// ---------------------------------------------------

module.exports = {
    deleteUser,
    getPublicProfile,
    getMyProfile,
    loginUser,
    registerUser,
    updateUser
}