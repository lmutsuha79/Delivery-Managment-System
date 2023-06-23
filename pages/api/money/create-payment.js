import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { amount, deliveryBoyId } = req.body;

  if (parseInt(amount) == 0) {
    return res.status(400).json({ error: "amount must be greater than zero" });
  }

  // Check if the delivery boy exists
  const deliveryBoy = await prisma.deliveryBoy.findUnique({
    where: {
      id: deliveryBoyId,
    },
  });

  if (!deliveryBoy) {
    return res.status(400).json({ error: "Invalid delivery boy ID" });
  }

  try {
    const boy = await prisma.deliveryBoy.update({
      where: {
        id: deliveryBoyId,
      },
      data: {
        unpaid: 0,
      },
    });
    const new_payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        deliveryBoy: {
          connect: { id: parseInt(deliveryBoyId) },
        },
      },
    });
    res.status(201).json(new_payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
