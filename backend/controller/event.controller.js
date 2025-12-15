import { Event } from "../models/event.model.js";
import { JoinEvent } from "../models/join-event-model.js";

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

        // Validation: Only check fields that are REQUIRED in the model
        // Required: title, date, time, location, price, userAdmin
        // Optional: description, image, category
        if (!title || !date || !time || !location || price === undefined || price === null || !userAdmin) {
            return res.status(400).json({ message: "Required fields missing: Title, Date, Time, Location, Price, or User" });
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
        const events = await Event.find().lean(); // Use lean for better performance and easier modification

        if (!events) {
            return res.status(404).json({ message: "Events not found" });
        }

        // Add attendee count to each event
        const eventsWithCount = await Promise.all(events.map(async (event) => {
            // Count all records for this event (or filter by status: 'confirmado' if desired)
            const count = await JoinEvent.countDocuments({ event_id: event._id });
            return { ...event, attendees_count: count };
        }));

        res.status(200).json({
            message: "Events found successfully",
            events: eventsWithCount
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

        // Cascade delete: Remove all join records for this event
        await JoinEvent.deleteMany({ event_id: event_id });

        await Event.findByIdAndDelete(event_id);

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