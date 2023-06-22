import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const deliveryBoys = await prisma.deliveryBoy.findMany({
      include: {
        orders: true,
      },

    });
    const deliveryBoysWithOrderCount = await Promise.all(
      deliveryBoys.map(async (deliveryBoy) => {
        const orderCount = await prisma.order.count({
          where: {
            deliveryBoyId: deliveryBoy.id,
            status: "delivered",

            
          },
        });

        return {
          ...deliveryBoy,
          orderCount,
        };
      })
    );
    const deliveryBoysWithCount = deliveryBoys.map((deliveryBoy) => {
      return {
        ...deliveryBoy,
        orderCount: deliveryBoy.orders.length,
      };
    });

    res.status(200).json(deliveryBoysWithCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
