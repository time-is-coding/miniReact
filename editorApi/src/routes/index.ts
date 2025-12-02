import express from "express";
import testRouter from "@/routes/test/index";
import uploadRouter from "@/routes/upload/index";
const { Router } = express;

const router = Router();

router.use("/test", testRouter);
router.use("/upload", uploadRouter);

export default router;
