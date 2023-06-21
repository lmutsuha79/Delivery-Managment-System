import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, name, phone, avatar, profiteForEveryDelivery } = req.body;

  try {
    const updatedDeliveryBoy = await prisma.DeliveryBoy.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        avatar,
        profiteForEveryDelivery: parseInt(profiteForEveryDelivery),
      },
    });

    res
      .status(200)
      .json({ message: "Delivery boy updated", updatedDeliveryBoy });
  } catch (error) {
    console.error("Error updating delivery boy:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
