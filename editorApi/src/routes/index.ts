import express from "express";
import testRouter from "@/routes/test/index";
const { Router } = express;

const router = Router();

router.use("/test", testRouter);

export default router;
