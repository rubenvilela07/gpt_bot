import express from "express";
import cors from "cors";
import chatRoutes  from "./routes/chatRoutes";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }
);