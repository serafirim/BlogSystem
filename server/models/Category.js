// Requires
const { Schema, model } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// Setup schema
const CategorySchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        createdBy: { // id of user who created the category
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true } // autogen createdAt and updatedAt
)

// Schema usage
CategorySchema.plugin(uniqueValidator)
module.exports = model("Category", CategorySchema)