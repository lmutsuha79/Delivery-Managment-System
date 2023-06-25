import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;

  try {
    // Fetch the total number of orders for the session
    const totalOrders = await prisma.order.count({
      where: {
        sessionId: parseInt(sessionId),
      },
    });

    // Fetch the number of delivered orders for the session
    const deliveredOrders = await prisma.order.count({
      where: {
        sessionId: sessionId,
        status: "delivered",
      },
    });

    // Fetch the number of canceled orders for the session
    const canceledOrders = await prisma.order.count({
      where: {
        sessionId: sessionId,
        status: "canceled",
      },
    });

    // Fetch the total amount of money for the session
    const totalMoney = await prisma.order.aggregate({
      where: {
        sessionId: sessionId,
        status: "delivered",
      },
      _sum: {
        money: true,
      },
    });

    return res.status(200).json({
      totalOrders: totalOrders,
      deliveredOrders: deliveredOrders,
      canceledOrders: canceledOrders,
      totalMoney: totalMoney._sum.money || 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
