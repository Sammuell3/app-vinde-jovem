import { User } from "../models/user.model.js"
import JWT from "jsonwebtoken"


const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validação basica
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são necessários" });
        }

        // verifica se o usuario ja existe
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: "Usuario ja existe" });
        }

        //Cria um novo usuario
        const user = await User.create({
            username, email: email.toLowerCase(), password
        })

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email, password: user.password }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        })

        if (!user) return res.status(400).json({
            message: "User não encontrado"
        });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({
            message: "Senha invalida"
        });

        const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const userLogout = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const userDelete = async (req, res) => {
    try {
        const { id: user_Id } = req.params;

        const user = await User.findOne({ _id: user_Id });

        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        await User.findByIdAndDelete(user_Id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
const getUsers = async (req, res) => {
    try {

        const users = await User.find();

        if (!users) return res.status(400).json({ message: "Usuario não encontrado" });

        res.status(200).json({
            message: "Users found successfully",
            user: users
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id: user_Id } = req.params;

        // Security Check: Only the user themselves or an Admin can get the details
        // req.user is populated by verifyToken middleware
        if (req.user.id !== user_Id && req.user.role !== 1) {
            return res.status(403).json({ message: "Você não tem permissão para ver este perfil" });
        }

        const user = await User.findOne({ _id: user_Id });

        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        res.status(200).json({
            message: "User found successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const userUpdate = async (req, res) => {
    try {
        const { id: user_Id } = req.params;

        // Security Check: Only the user themselves or an Admin can update
        // req.user is populated by verifyToken middleware
        if (req.user.id !== user_Id && req.user.role !== 1) {
            return res.status(403).json({ message: "Você não tem permissão para editar este usuário" });
        }

        const user = await User.findByIdAndUpdate(user_Id, req.body, { new: true });

        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export {
    getUserById,
    userUpdate,
    getUsers,
    userDelete,
    userLogin,
    userLogout,
    userRegister
}