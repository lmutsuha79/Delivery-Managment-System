import prisma from "@/lib/prisma";

export default async function markDeliveryBoyPresent(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId, deliveryBoyId } = req.body;

  try {
    // Check if the delivery boy exists
    const deliveryBoy = await prisma.deliveryBoy.findUnique({
      where: {
        id: deliveryBoyId,
      },
    });

    if (!deliveryBoy) {
      return res.status(404).json({ error: "Delivery boy not found" });
    }

    // Get the session by ID
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check if the delivery boy is already marked as present in the session
    // so just change his status to false
    const attendanceRecord = await prisma.attendance.findFirst({
      where: {
        sessionId: session.id,
        deliveryBoyId: deliveryBoyId,
      },
    });

    // if (attendanceRecord && attendanceRecord.present) {
    //   await prisma.attendance.update({
    //     where: { id: attendance.id },
    //     data: {
    //       status: true,
    //     },
    //   });

    // }

    // Update the attendance record or create a new one if it doesn't exist
    if (attendanceRecord) {
      await prisma.attendance.update({
        where: {
          id: attendanceRecord.id,
        },
        data: {
          // present: true,
          status: true,
        },
      });
    } else {
      await prisma.attendance.create({
        data: {
          session: {
            connect: {
              id: session.id,
            },
          },
          deliveryBoy: {
            connect: {
              id: deliveryBoyId,
            },
          },
          present: true,
          status: true,
        },
      });
    }

    return res.status(200).json({ message: "Delivery boy marked as present" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
