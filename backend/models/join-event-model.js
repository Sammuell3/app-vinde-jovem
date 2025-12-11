import mongoose, { Schema } from "mongoose";

const joinEventSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    status: {
        type: String,
        required: true,
        enum: ["confirmado", "cancelado", "na lista de espera"],
        default: "na lista de espera"
    }
},
    {
        timestamps: true
    }
)

export const JoinEvent = mongoose.model("JoinEvent", joinEventSchema);
