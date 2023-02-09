const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   GET api/v1/user/myprofile
// @desc    Get user profile
// @access  Private

// @route   GET api/v1/users/
// @desc    Get users
// @access  Public
const getAllUsers = async (req, res) => {
    try {
        //res.send('Get profile for user')
        var users = await User.find({})
        var usersArray = []

        // If user doesn't exist
        if (!users) {
            return res.status(404).json({message: 'No users exist', type: 'error'})
        } else {
            for (var i = 0; i < users.length; i++) {
                var userIsPrivate = users[i].isPrivate

                //console.log(userIsPrivate)

                if (userIsPrivate){
                    // User is private
                    
                    var user = await User.findOne({ userName: users[i].userName })
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
                    var user = await User.findOne({ userName: users[i].userName })
                        .select('-password')
                        .select('-createdAt')
                        .select('-updatedAt')
                        .select('-__v')
                        .select('-verificationCode')
                        .select('-isEmailVerified')
                        .select('-passwordResetCode')
                        .select('-isPrivate')
                }        

                // add to usersArray
                usersArray = usersArray.concat(user)
            }

            // return user
            res.json(usersArray)
        }
        
    } catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold)
        res.status(500).send('Internal Server Error')
    }
}

function validatedEmail(email){
    const regex =/\S+@\S+\.\S+/;

    //validemail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email);
}

module.exports = {
    getAllUsers
}