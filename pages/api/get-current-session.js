import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Find the current active session
      const session = await prisma.session.findFirst({
        where: {
          endTime: null,
        },
      });

      if (session) {
        res.status(200).json({ sessionId: session.id });
      } else {
        res.status(404).json({ error: "No active session found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch the current session" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
