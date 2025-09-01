import express from "express";
import indexRouter from "@/routes/index";

const app = express();
const PORT = process.env.PORT || 9999;

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
