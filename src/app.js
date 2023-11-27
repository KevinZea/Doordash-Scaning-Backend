import express from "express";
import morgan from "morgan";
import cors from "cors"


const app = express();

// Import routes
import pedidoRoute from "./routes/pedidoRoute.js"
// Middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", pedidoRoute)


export default app;