const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category