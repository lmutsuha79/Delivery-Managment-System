import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;

  try {
    // Fetch the attendance status of the delivery boy
    const attendance = await prisma.attendance.findMany({
      where: {
        sessionId: sessionId,
      },
      include: {
            deliveryBoy: true,
          },
    });

    if (!attendance) {
      // If no attendance record is found, the delivery boy is considered absent
      return res.status(200).json({ activeBoys: [] });
    }
    const activeBoys = attendance.map(item => item.deliveryBoy)

    return res.status(200).json({ activeBoys: activeBoys });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
