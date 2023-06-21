import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { sessionId } = req.body;
  try {
    // const delivered_orders = await prisma.order.findMany({
    //   where: {
    //     sessionId: parseInt(sessionId),
    //     status: "delivered",
    //   },
    //   include: {
    //     deliveryBoy: true,
    //     session: true,
    //   },
    // });
    // const report = calculateDeliveryBoyTotals(delivered_orders);
    const deliveryBoysEarnings = await prisma.deliveryBoy.findMany({
      where: {
        attendances: {
          some: {
            sessionId,
            present: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        avatar:true,
        
        orders: {
          where: {
            sessionId,
            status: "delivered",
          },
          select: {
            money: true,
          },
        },
      },
    });

    const deliveryBoysWithEarnings = deliveryBoysEarnings.map((deliveryBoy) => {
      const earnings = deliveryBoy.orders.reduce(
        (total, order) => total + order.money,
        0
      );
      const completedOrders = deliveryBoy.orders.length;

      return {
        deliveryBoy,
        earnings,
        completedOrders,
      };
    });

    res.status(200).json({ deliveryBoysWithEarnings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

// async function getDeliveryBoysEarnings(sessionId) {

//   return deliveryBoysEarnings;
// }

function calculateDeliveryBoyTotals(orders) {
  const deliveryBoyTotals = {};

  let totalMoney = 0;

  for (const order of orders) {
    const { deliveryBoy, money } = order;
    const { id } = deliveryBoy;

    if (id in deliveryBoyTotals) {
      deliveryBoyTotals[id].total += money;
      deliveryBoyTotals[id].deliveredOrder++;
    } else {
      deliveryBoyTotals[id] = {
        deliveredOrder: 1,
        total: money,
        deliveryBoy: deliveryBoy,
      };
    }

    totalMoney += money;
  }

  const boys = Object.values(deliveryBoyTotals);

  const result = {
    total: totalMoney,
    boys,
  };

  return result;
}
