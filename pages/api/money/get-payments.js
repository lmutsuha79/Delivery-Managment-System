import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        deliveryBoy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
