import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      phoneNumber,
      customerName,
      moreInfo,
      pickUpLocation,
      deliveryLocation,
      money,
      deliveryBoyId,
      sessionId,
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

    const order = await prisma.order.create({
      data: {
        phoneNumber,
        customerName,
        moreInfo,
        pickUpLocation,
        deliveryLocation,
        money: parseFloat(money),
        deliveryBoy: {
          connect: { id: deliveryBoyId },
        },
        session: {
          connect: { id: sessionId },
        },
      },
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
