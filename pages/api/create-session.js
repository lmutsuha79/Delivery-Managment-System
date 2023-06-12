// pages/api/startSession.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Check if there is an active session
      const activeSession = await prisma.session.findFirst({
        where: {
          endTime: null,
        },
      });

      if (activeSession) {
        return res
          .status(400)
          .json({ error: "An active session already exists" });
      }

      // Start a new session
      const session = await prisma.session.create({
        data: {
          // `startTime` field will default to the current date and time
        },
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to start a new session" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
