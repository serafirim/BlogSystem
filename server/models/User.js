// Requires
const { Schema, model } = require("mongoose")

// Set up schema
const UserSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "no-image.png",
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
        verificationCode: {
            type: Number,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        passwordResetCode: {
            type: String,
        },
        isPrivate: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true } // Tells mongoose to add createdAt and updatedAt properties to a schema
)

// export for usage
module.exports = model("User", UserSchema)