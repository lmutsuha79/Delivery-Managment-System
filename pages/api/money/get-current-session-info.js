import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { sessionId } = req.body;
  try {
    const currentSessionInfo = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
      include: {
        attendances: true,
        orders: true,
      },
    });
    res.json(currentSessionInfo);
  } catch (error) {
    console.error("Error fetching current session:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    prisma.$disconnect();
  }
}
