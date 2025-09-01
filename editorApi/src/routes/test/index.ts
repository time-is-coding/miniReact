import express from "express";
const { Router } = express;
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("这是test");
});

export default router;
