import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes/index";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
dotenv.config();
app.use(cors(corsOptions));

// parsing data coming from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
connectDB();

app.get("/", (req, res) => {
  res.send("hello world ");
});

app.use("/api/v1", routes);
app.listen(port, () => {
  console.log(`Server is running succesfully on the port ${port}`);
});
