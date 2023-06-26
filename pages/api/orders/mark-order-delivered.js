import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { orderId } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "delivered",
      },
    });

    res.status(201).json({ message: "Order marked as delivered", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
