import express from "express";
import encodeRouter from "./routers/encode";
import decodeRouter from "./routers/decode";
import cors from "cors";
const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.use('/decode', decodeRouter);
app.use('/encode', encodeRouter);

app.listen(port, () => {
  console.log(`Server running at ${localhost}`);
});