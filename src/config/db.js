const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("conectado a la DB 🙂");
    } catch (error) {
        console.log("error conectando con la DB 😞");
    }
}

module.exports = { connectDB }