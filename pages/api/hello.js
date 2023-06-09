// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Return a 405 Method Not Allowed if the request is not a POST
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, avatar, phone } = req.body;

    const newBoy = await prisma.DeliveryBoy.create({
      data: {
        name,
        avatar,
        phone,
      },
    });

    res.status(201).json(newBoy);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
