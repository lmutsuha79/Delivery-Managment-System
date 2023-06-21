import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Return a 405 Method Not Allowed if the request is not a POST
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { avatar, phone, name, profiteForEveryDelivery } = req.body;

    const newUser = await prisma.deliveryBoy.create({
      data: {
        avatar,
        phone,
        name,
        profiteForEveryDelivery: parseInt(profiteForEveryDelivery),
      },
    });
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
