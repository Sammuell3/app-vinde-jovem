import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        console.log("MongoDB URI", process.env.DATABASE_URI);
        await connectDB()

        app.on("error", (error) => {
            console.log("error", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Servidor funcionadno na porta: ${process.env.PORT || 8000}`);
        })

    } catch (error) {
        console.log("Conexão com MOngoDb falhou")
    }

}

startServer();