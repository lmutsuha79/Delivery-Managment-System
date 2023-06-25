import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      id,
      phoneNumber,
      customerName,
      moreInfo,
      pickUpLocation,
      deliveryLocation,
      money,
      deliveryBoyId,
      sessionId,
      status,
      profiteForEveryDelivery,
    } = req.body;
    // Check if the delivery boy exists
    const deliveryBoy = await prisma.deliveryBoy.findUnique({
      where: {
        id: deliveryBoyId,
      },
    });

    if (!deliveryBoy) {
      return res.status(400).json({ error: "Invalid delivery boy ID" });
    }

    // Check if the session exists and is active
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session || session.endTime !== null) {
      return res
        .status(400)
        .json({ error: "Invalid session ID or session has ended" });
    }

    const prevOrderInfo = await prisma.order.findUnique({
      where: { id },
      select: {
        status: true,
        deliveredAt: true,
      },
    });

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        deliveredAt:
          status === "delivered" && prevOrderInfo.status !== "delivered"
            ? new Date()
            : prevOrderInfo.deliveredAt,
        phoneNumber,
        customerName,
        moreInfo,
        pickUpLocation,
        deliveryLocation,
        money: parseFloat(money),

        deliveryBoy: {
          connect: { id: deliveryBoyId },
          update: {
            unpaid: {
              increment:
                status === "delivered" && prevOrderInfo.status !== "delivered"
                  ? profiteForEveryDelivery
                  : 0,
            },
          },
        },
        session: {
          connect: { id: sessionId },
        },
      },
    });

    res.status(201).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
