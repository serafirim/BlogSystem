// Requires
const { Schema, model } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// Create schema
const PageSchema = new Schema (
    {
        category: {
            type: String,
            ref: "Category",
            default: "Uncategorized"
        },
        title: {
            type: String,
            required: true,
        },
        slug: { // similiar to wordpress SEO optimized friendly url; handled and created by swagger
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true } //autogen createdAt and updatedAt
)

// Schema usage
PageSchema.plugin(uniqueValidator)
module.exports = model("Page", PageSchema)
