import prisma from "@/lib/prisma";

export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

  try {
    const orders = await prisma.order.findMany({
      include: {
        session: true,
        deliveryBoy: true,
      },
    });

    return res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
