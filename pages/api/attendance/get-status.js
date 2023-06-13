// pages/api/attendance/status.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { deliveryBoyId, sessionId } = req.body;

  try {
    // Fetch the attendance status of the delivery boy
    const attendance = await prisma.attendance.findFirst({
      where: {
        deliveryBoyId: parseInt(deliveryBoyId),
        sessionId: sessionId,
      },
    });

    if (!attendance) {
      // If no attendance record is found, the delivery boy is considered absent
      return res.status(200).json({ status: false });
    }

    return res.status(200).json({ status: attendance.status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
