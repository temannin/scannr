const express = require("express");

const emojis = require("./emojis");

const router = express.Router();
const Keyv = require("keyv");
const keyv = new Keyv();
const crypto = require("crypto");

router.get("/token", async (req, res) => {
  const token = crypto.randomBytes(24).toString("hex");
  const inserted = await keyv.set(token, [], 1000 * 60 * 60 * 3);

  if (inserted) {
    res.json({
      token: token,
    });
  }
});

router.post("/scan", async (req, res) => {
  const token = req.headers.token;
  let transactions = await keyv.get(token);
  if (transactions) {
    transactions = [
      ...transactions,
      {
        fake_data:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      },
    ];
    await keyv.set(token, transactions);
    res.json({
      status: "success",
      message: "Scan was successful",
      transactions: await keyv.get(token),
    });
  } else {
    res.json({ status: "error", message: "Session token is invalid" });
  }
});

router.use("/emojis", emojis);

module.exports = router;
