import { JoinEvent } from "../models/join-event-model.js";

// Se inscreve em um evento
const joinEvent = async (req, res) => {
    try {
        const { user_id, event_id } = req.body;

        // Verifica se o usuario ja esta inscrito no evento
        const event = await JoinEvent.findOne({ user_id, event_id });

        if (event) {
            return res.status(400).json({ message: "User already joined the event" });
        }

        const eventCreate = await JoinEvent.create({
            user_id,
            event_id
        });

        res.status(201).json({
            message: "Join event created successfully",
            eventCreate
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Meus eventos
const myEvents = async (req, res) => {
    try {
        const { id: user_id } = req.params;

        // Segurança: Verifica se o usuário do token é o mesmo do ID solicitado, ou se é admin
        // req.user vem do middleware verifyToken
        if (req.user.id !== user_id && req.user.role !== 1) {
            return res.status(403).json({ message: "Você só pode ver seus próprios eventos" });
        }

        const events = await JoinEvent.find({ user_id }).populate("event_id");

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

const deleteJoinEvent = async (req, res) => {
    try {
        const { id: join_id } = req.params;

        // O usuario pode deletar a propria inscrição, ou o admin pode deletar qualquer uma
        const join = await JoinEvent.findById(join_id);

        if (!join) {
            return res.status(404).json({ message: "Inscrição não encontrada" });
        }

        // Verifica se é o dono da inscrição ou admin
        if (req.user.id !== join.user_id.toString() && req.user.role !== 1) {
            return res.status(403).json({ message: "Sem permissão para cancelar esta inscrição" });
        }

        await JoinEvent.findByIdAndDelete(join_id);

        res.status(200).json({
            message: "Inscrição cancelada com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const leaveEventByEventId = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id; // From token

        const deleted = await JoinEvent.findOneAndDelete({
            user_id: userId,
            event_id: eventId
        });

        if (!deleted) {
            return res.status(404).json({ message: "You are not joined to this event" });
        }

        res.status(200).json({ message: "Successfully left the event" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsersByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Optional: Check if user is admin or the event owner (if applicable)
        // For now allowing authenticated users (or restrict to admin)
        if (req.user.role !== 1) { // Assuming 1 is admin
            return res.status(403).json({ message: "Access denied" });
        }

        const attendees = await JoinEvent.find({ event_id: eventId })
            .populate('user_id', 'name email') // Populate specific fields
            .select('user_id status createdAt');

        if (!attendees) {
            return res.status(404).json({ message: "No attendees found" });
        }

        res.status(200).json({
            message: "Attendees found successfully",
            attendees
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    joinEvent,
    myEvents,
    deleteJoinEvent,
    leaveEventByEventId,
    getUsersByEvent
}