import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  console.log(req.body.id);

  const { id } = req.body;

  try {
    // Use the Prisma client to delete the item
    const deletedBoy = await prisma.DeliveryBoy.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Delivery boy deleted", deletedBoy });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
