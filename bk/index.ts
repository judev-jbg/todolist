
import express, {Request, Response} from "express";
import cors from "cors";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB


//Rutas

//Inicio del servidor
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})