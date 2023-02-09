const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   POST api/v1/user/delete/:id
// @desc    Delete user by id
// @access  Private
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id

        if(userId !== req.user.id){
            return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}])
        }

        let user = await User.findOneAndDelete({_id: userId})

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}])

        if(user) return res.status(404).json([{message: 'User has been deleted!', type: 'success'}])

        //res.json(user)

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Server Error')
    }
}

// @route   GET api/v1/user/myprofile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id)
            .select('-password').select('-__v')
            .select('-createdAt').select('-updatedAt');


        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);

        res.json(user);
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

// @route   GET api/v1/user/public/:username
// @desc    Get user profile by username 
// @access  Public
const getPublicProfile = async (req, res) => {
    try {
        //res.send('Get profile for user')
        var user = await User.findOne({ userName: req.params.id })

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({message: 'User does not exist', type: 'error'})
        } else {
            if (user.isPrivate){
                // User is private
                user = await User.findOne({ userName: req.params.id })
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
                user = await User.findOne({ userName: req.params.id })
                    .select('-password')
                    .select('-createdAt')
                    .select('-updatedAt')
                    .select('-__v')
                    .select('-verificationCode')
                    .select('-isEmailVerified')
                    .select('-passwordResetCode')
                    .select('-isPrivate')
            }

            // return user
            res.json(user)
        }
        
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
        // Get post data
        const { userNameEmail, password } = req.body
        
        // Create variables
        let toasts = []
        var FoundBy

        // - Validate information ---------------------------------------------------------------------------------
        // Check for blanks        
        if (!userNameEmail) toasts.push( {message: 'Username/Email cannot be blank', type: 'error'} )
        if (!password) toasts.push( {message: 'Password cannot be blank', type: 'error'} )
        if(password && (password.length < 8 || password.length > 12 )) toasts.push({message: 'Password must be at least 6 - 12 characters long', type: 'error'})

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
            var MatchPassword = await bcrypt.compare(password, FindByUser.password)
            
            if (!MatchPassword) toasts.push({message: 'Invalid password', type: 'error'})        
            
            // Set a FoundBy variable
            FoundBy = FindByUser
        }

        // by email
        if (FindByEmail) {
            // Match the password from the db
            var MatchPassword = await bcrypt.compare(password, FindByEmail.password)

            if (!MatchPassword) toasts.push({message: 'Invalid password', type: 'error'})

            // Set a FoundBy variable
            FoundBy = FindByEmail
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
        if(toasts.length > 0) {
            return res.status(400).json(toasts)
        }
        else 
        {
            const payload = {
                user: {
                    id: FoundBy._id
                }
            }
    
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            }, (err, token) => {
                if(err) throw err;
                res.json(token);
            })
        }

        //if(!user) return res.status(400).json([{message: 'User does not exist', type: 'error'}]);

        //const isMatch = await bcrypt.compare(password, user.password);

        //if(!isMatch) return res.status(400).json([{message: 'Invalid credentials', type: 'error'}]);        
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

// @route   POST api/v1/user/register
// @desc    Register a user
// @access  Public
const registerUser = async (req, res) => {
    try{
        // Get post data
        const { firstName, lastName, userName,  email, password } = req.body

        // Set up variables
        let toasts = [];
        let Us = await User.findOne({userName})
        let Em = await User.findOne({email})

        // Validate information
        if(!firstName) toasts.push({message: 'First name is required', type: 'error'})
        if(!lastName) toasts.push({message: 'Last name is required', type: 'error'})

        if(!password) toasts.push({message: 'A valid Password is required', type: 'error'})
        if(password && (password.length < 8 || password.length > 12 )) toasts.push({message: 'Password must be at least 6 - 12 characters long', type: 'error'})
        if (!userName) toasts.push( {message: 'Username is required', type: 'error'} )
        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid Email is required', type: 'error'})
        if (Us) toasts.push( {message: 'User already exists', type: 'error'} )
        if (Em) toasts.push( {message: 'Email is already being used', type: 'error'} )

        // Send toasts
        if(toasts.length > 0) {
            return res.status(400).json(toasts)
        } else {
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
                expiresIn: 86400
            }, (err, token) => {
                if(err) throw err
                res.json(token)
            })
            // ----------------------------------------------------
            
            // this sends the json data
            //res.json(Us)
        }

    }catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Server Error')
    }
}

// @route   GET api/v1/user/update/:id
// @desc    Update profile by id
// @access  Private
const updateUser = async (req, res) => {
    try {
        // Set variables
        const CurrentUserId = req.user.id
        var IsCurrentUserUs, IsCurrentUserEm = false
        var InDbCurrentPassword
        
        var newBody = {
            ...req.body
        }

        // Get the post data 
        const { firstName, lastName, userName, email, image, role, currentPassword, newPassword, confirmNewPassword, isPrivate} = req.body
        
        //console.log(isPrivate)

        //if (isPrivate) return res.status(401).json([{message: `IsPrivate value: ${isPrivate}`, type: 'error'}])
        //if (!isPrivate) return res.status(401).json([{message: 'something went wrong', type: 'error'}])

        // Check for user with id
        var user = await User.findById({ _id: req.params.id })

        // Used for front end messages
        let toasts = []

        // See if user exists
        if (user) {
            // User exists; continue
            // Check to see if authorized
            if (CurrentUserId == req.params.id)
            {
                // Set up variables
                var Us = await User.findOne({ userName: req.body.userName})
                var Em = await User.findOne({ email: req.body.email})

                // Check to see if the id of Us matches the user being updated
                if (!userName) {
                    return res.status(400).json([{message: 'Username cannot be blank', type: 'error'}])
                } else {
                    if (Us) {
                        if (Us.id == req.user.id) {
                            IsCurrentUserUs = true

                            // Find the current password
                            InDbCurrentPassword = Us.password
                        }
                    }
                }

                // Check to if the id of Em matches the user being updated
                if(!email || !validatedEmail(email)) {
                    return res.status(400).json([{message: 'A valid email is required', type: 'error'}])
                } else {
                    if (Em) {
                        if (Em.id == req.user.id) {
                            IsCurrentUserEm = true
                            
                            // Find the current password
                            InDbCurrentPassword = Em.password
                        }
                    }
                }            

                // Validate information
                if(!firstName) return res.status(400).json([{message: 'First name cannot be blank', type: 'error'}])
                if(!lastName) return res.status(400).json([{message: 'Last name cannot be blank', type: 'error'}])
                            
                if (Us && !IsCurrentUserUs) return res.status(400).json([{message: 'Username already taken', type: 'error'}])
                if (Em && !IsCurrentUserEm) return res.status(400).json([{message: 'Email is already being used', type: 'error'}])                

                // Version 1.3.2: Functionality to update password            
                if (currentPassword) {
                    console.log(`Current password input: `, currentPassword)            
                    //  Check to see if currentpassword matches current password in db
                    
                    console.log(`New password input: `, newPassword)
                    
                    console.log(`Confirm new password input: `, confirmNewPassword)

                    // Check for blank new password
                    if(!newPassword) {
                        return res.status(400).json([{message: 'New password cannot be blank if current password is filled out.', type: 'error'}])
                    } else {                        
                        // Check for new password is right criteria
                        if(newPassword && (newPassword.length < 8 || newPassword.length > 12 )) {
                            return res.status(400).json([{message: 'New Password must be at least 6 - 12 characters', type: 'error'}])
                        } else {
                            // Check to see that new password and confirm new password match
                            if (newPassword != confirmNewPassword) {
                                return res.status(400).json([{message: 'New Password and Current Password must match.', type: 'error'}])
                            }
                            else 
                            {
                                //console.log("all good")
                                //return res.status(200).json([{ message: 'All good!', type: 'success' }])
                                
                                // hash the password before saving to db
                                const salt = await bcrypt.genSalt(10)

                                // Set new password
                                //req.body.password = await bcrypt.hash(req.body.password, salt)
                                newBody = {
                                    ...req.body,
                                    password: await bcrypt.hash(newPassword, salt),
                                }                            

                                // save user
                                let user = await User.findOneAndUpdate({_id: CurrentUserId}, newBody, {merge: true});
                            }
                        }
                    }
                } else {
                    // hash the password before saving to db
                    const salt = await bcrypt.genSalt(10)

                    // Set password on the newbody since there's not a place for it on the form; There is current, new, and confirm password but only if those are entered.
                    newBody = {
                        ...req.body,
                        password: InDbCurrentPassword,
                    }

                    //console.log(newBody)

                    // save user
                    let user = await User.findOneAndUpdate({_id: CurrentUserId}, newBody, {new: true});

                    return res.status(200).json([{message: 'User updated successfully!', type: 'success'}])    
                }
            } else {
                return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}])
            }
            
        } else {
            // User does not exist
            return res.status(401).json([{message: 'User does not exist', type: 'error'}])
        }

        /* OLD
        const currentUser = await User.findById({ _id: req.user.id })

        if(userId !== req.user.id){
            return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}]);
        }

        let user = await User.findOneAndUpdate({_id: userId}, req.body, {new: true});

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);        
        */

        //res.json(user)

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');       
    }
}

function validatedEmail(email){
    const regex =/\S+@\S+\.\S+/;

    //validemail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email);
}

module.exports = {
    deleteUser,
    getProfile,
    getPublicProfile,
    loginUser,
    registerUser,
    updateUser
}