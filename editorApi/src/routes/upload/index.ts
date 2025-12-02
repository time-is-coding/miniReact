import express from "express";
const { Router } = express;
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req, "我接受到请求了");
  res.send("upload");
});

export default router;
