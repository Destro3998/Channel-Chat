import express from "express";
import { getUser, updateUser, getallUsers } from "../controllers/channelControllers.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/allusers", getallUsers);
router.put("/", updateUser);

export default router;
