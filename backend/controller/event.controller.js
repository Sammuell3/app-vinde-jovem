import { Event } from "../models/event.model.js";

const createEvent = async (req, res) => {
    try {

        const {
            title,
            description,
            date,
            time,
            location,
            image,
            price,
            category,
            userAdmin
        } = req.body;

        if (!title || !description || !date || !time || !location || !image || !price || !category || !userAdmin) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const event = await Event.create({
            title,
            description,
            date,
            time,
            location,
            image,
            price,
            category,
            userAdmin
        });


        res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEvents = async (req, res) => {
    try {

        const events = await Event.find();

        if (!events) {
            return res.status(404).json({ message: "Events not found" });
        }

        res.status(200).json({
            message: "Events found successfully",
            events: events
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteEvent = async (req, res) => {
    try {
        const { id: event_id } = req.params;

        const event = await Event.findById(event_id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await Event.findByIdAndDelete(user_id);

        res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEventById = async (req, res) => {
    try {
        const { id: event_id } = req.params;

        const event = await Event.findById(event_id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Event found successfully",
            event
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id: event_id } = req.params;

        const event = await Event.findByIdAndUpdate(event_id, req.body, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    createEvent,
    getEvents,
    deleteEvent,
    getEventById,
    updateEvent
}