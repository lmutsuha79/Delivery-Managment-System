// pages/api/stopSession.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { sessionId } = req.body;

      // Retrieve the session with the given ID
      const session = await prisma.session.findUnique({
        where: {
          id: parseInt(sessionId),
        },
      });

      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      if (session.endTime) {
        return res.status(400).json({ error: "Session is already stopped" });
      }

      // Stop the session by updating the endTime
      const updatedSession = await prisma.session.update({
        where: {
          id: session.id,
        },
        data: {
          endTime: new Date(),
        },
      });

      res.status(200).json({ sessionId: updatedSession.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to stop the session" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
