const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/codes", async function (req, res, next) {
  const codePath = path.join(
    __dirname,
    "../public",
    "cpt_codes",
    "json",
    "IPT Codes - Codes2 icd10cm_order_2024.json"
  );

  const codes = await fs.promises.readFile(codePath);
  const resp = await codes.toString();
  const parsed = JSON.parse(resp);

  const smallCodes = parsed.slice(0, 100);
  res.json(smallCodes);
});

module.exports = router;
