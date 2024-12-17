import { Router } from "express";
import {
  createBlogsController,
  deleteBlogController,
  getBlogController,
  getBlogsController,
} from "../controllers/blog.controller";
import { fileFilter } from "../lib/fileFilter";
import { verifyToken } from "../lib/jwt";
import { uploader } from "../lib/multer";
import { validateCreateBlog } from "../validators/blog.validator";

const router = Router();

router.get("/", getBlogsController);
router.get("/:id", getBlogController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogsController
);
router.delete("/:id", verifyToken, deleteBlogController);

export default router;
