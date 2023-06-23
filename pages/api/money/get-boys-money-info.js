import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const deliveryBoys = await prisma.deliveryBoy.findMany({
      include: {
        orders: true,
      },
    });

    const deliveryBoysWithOrderCount = deliveryBoys.map((deliveryBoy) => {
      const orderCount = deliveryBoy.orders.filter(
        (order) => order.status === "delivered"
      ).length;

      return {
        ...deliveryBoy,
        orderCount,
      };
    });

    res.status(200).json(deliveryBoysWithOrderCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}