import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(
            `${process.env.DATABASE_URI}`)
        console.log("\n Perfeito: MongoDB conectado com sucesso", connectInstance.connect.host)
    } catch (error) {
        console.log("Merda, erro na conexão com MongoDB", error)
        process.exit(1)
    }
}

export default connectDB