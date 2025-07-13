const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Save score
router.post("/leaderboard", async (req, res) => {
  const { name, points } = req.body;

  try {
    const entry = await prisma.leaderboard.create({
      data: { name, points },
    });
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get leaderboard
router.get("/leaderboard", async (_req, res) => {
  try {
    const entries = await prisma.leaderboard.findMany({
      orderBy: { points: "desc" },
      take: 50,
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
