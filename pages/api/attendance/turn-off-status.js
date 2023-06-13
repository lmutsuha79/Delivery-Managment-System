import prisma from "@/lib/prisma";

export default async function updateAttendanceStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId, deliveryBoyId } = req.body;

  try {
    // Check if the attendance record exists
    const attendance = await prisma.attendance.findFirst({
      where: {
        deliveryBoyId,
        sessionId,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    // Update the status value
    await prisma.attendance.update({
      where: {
        id: attendance.id,
      },
      data: {
        status: false,
      },
    });

    return res
      .status(200)
      .json({ message: "Attendance status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
