import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 1000
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    userAdmin: {
        type: Schema.Types.ObjectId,
        ref: "UserAdmin",
        required: true
    },
    registration: {
        type: Schema.Types.ObjectId,
        ref: "Registration",
        required: true
    }
},
    {
        timestamps: true
    }

)

export const EventModel = mongoose.model("Event", eventSchema);