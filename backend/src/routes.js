const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Save or update score
router.post("/leaderboard", async (req, res) => {
  console.log("Saving/updating score for user:", req.body);
  const { userId, highscore } = req.body;

  try {
    // Check if user already exists
    let entry = await prisma.leaderboard.findUnique({
      where: { userId },
    });

    if (entry) {
      // Update only if new score is higher
      entry = await prisma.leaderboard.update({
        where: { userId },
        data: { highscore: Math.max(entry.highscore, highscore) },
      });
    } else {
      // Insert new entry
      entry = await prisma.leaderboard.create({
        data: { userId, highscore },
      });
    }

    // Find rank of the user
    const betterScores = await prisma.leaderboard.count({
      where: { highscore: { gt: entry.highscore } },
    });

    const rank = betterScores + 1;

    res.json({ ...entry, rank });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save/update score" });
  }
});

// Get leaderboard (top 50)
router.get("/leaderboard", async (_req, res) => {
  console.log("Fetching leaderboard...");
  try {
    const entries = await prisma.leaderboard.findMany({
      orderBy: { highscore: "desc" },
      take: 50,
    });

    // Attach rank to each player
    const withRank = entries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    res.json(withRank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
