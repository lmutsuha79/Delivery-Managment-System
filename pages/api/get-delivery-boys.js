import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const deliveryBoys = await prisma.DeliveryBoy.findMany();
    res.json(deliveryBoys);
  } catch (error) {
    console.error("Error fetching deliveryBoys:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
