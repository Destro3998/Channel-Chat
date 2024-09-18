import express from "express";
import { getSubReply, addSubReply } from "../controllers/subreply.js";

const router = express.Router();

router.get("/", getSubReply);
router.post("/", addSubReply);

export default router;
