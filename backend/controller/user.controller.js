import { User } from "../models/user.model.js"

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
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                password: user.password
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

export {
    userRegister,
    userLogin,
    userLogout
}