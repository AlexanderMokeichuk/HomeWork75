import express from "express";
import {PASSWORD, VIGENERE} from "../constants";

const encodeRouter = express.Router();

encodeRouter.post('/', (req, res) => {
  const encodedMessage = VIGENERE.Cipher(PASSWORD).crypt(req.body.encode);
  return res.send({
    encode: '',
    password: "",
    decode: encodedMessage,
  });
});

export default encodeRouter;