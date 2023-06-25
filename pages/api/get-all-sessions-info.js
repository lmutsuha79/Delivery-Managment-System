import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        orders: {
          include: {
            deliveryBoy: true,
          },
        },
        attendances: {
          include: {
            deliveryBoy: true,
          },
        },
      },
    });

    return res.status(200).json({ sessions: sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
