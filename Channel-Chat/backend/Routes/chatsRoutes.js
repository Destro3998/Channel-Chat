import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  getAllPosts,
} from "../controllers/chatsControllers.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/allposts", getAllPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
