const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

let smallparsed;
let parsed;
const loadFiles = async () => {
  if (smallparsed || parsed) {
    return { smallparsed, parsed };
  }
  const codePath = path.join(
    __dirname,
    "../public",
    "cpt_codes",
    "json",
    "IPT Codes - Codes2 icd10cm_order_2024.json"
  );
  const smallCodePath = path.join(
    __dirname,
    "../public",
    "cpt_codes",
    "json",
    "IPT Codes - Codes3 icd10pcs_codes_2024.json"
  );

  const smallcodes = await fs.promises.readFile(smallCodePath);
  const smallresp = await smallcodes.toString();
  smallparsed = JSON.parse(smallresp);

  const codes = await fs.promises.readFile(codePath);
  const resp = await codes.toString();
  parsed = JSON.parse(resp);

  return { smallparsed, parsed };
};

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/search", async function (req, res, next) {
  await loadFiles();
  const { keyword } = req.query;
  const filtered = parsed.filter((p) => p["Description"].includes(keyword));
  res.json(filtered);
});

router.get("/codes", async function (req, res, next) {
  const files = await loadFiles();
  const smallCodes = files.parsed.slice(0, 100);
  res.json(smallCodes);
});

module.exports = router;
