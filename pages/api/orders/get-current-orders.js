import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { sessionId } = req.body;
  console.log(sessionId);
  try {
    const orders = await prisma.order.findMany({
      where: {
        sessionId: parseInt(sessionId),
      },
      include: {
        deliveryBoy: true,
        session: true,
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
