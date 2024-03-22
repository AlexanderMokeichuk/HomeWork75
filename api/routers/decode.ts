import express from "express";
import {PASSWORD, VIGENERE} from "../constants";

const decodeRouter = express.Router();

decodeRouter.post('/', (req, res) => {
  const decodedMessage = VIGENERE.Decipher(PASSWORD).crypt(req.body.decode);
  return res.send({
    encode: decodedMessage,
    password: "",
    decode: "",
  });
});

export default decodeRouter;