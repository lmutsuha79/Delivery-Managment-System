import prisma from "@/lib/prisma";
export default async function handler(req, res) {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
      }
    
      try {
        const { startDate, endDate } = req.body;
    
        let orderFilter = {};
        let deliveredOrderFilter = {};
        let canceledOrderFilter = {};
    
        if (startDate && endDate) {
          orderFilter = {
            createdAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
          };
    
          deliveredOrderFilter = {
            deliveredAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
            status: 'delivered',
          };
    
          canceledOrderFilter = {
            updatedAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
            status: 'canceled',
          };
        } else {
          orderFilter = {};
          deliveredOrderFilter = { status: 'delivered' };
          canceledOrderFilter = { status: 'canceled' };
        }
    
        const [orderCount, totalEarnings, deliveredOrderCount, canceledOrderCount] = await Promise.all([
          prisma.order.count({
            where: orderFilter,
          }),
          prisma.order.aggregate({
            where: orderFilter,
            _sum: {
              money: true,
            },
          }),
          prisma.order.count({
            where: deliveredOrderFilter,
          }),
          prisma.order.count({
            where: canceledOrderFilter,
          }),
        ]);
    
        res.status(200).json({
          orderCount,
          totalEarnings: totalEarnings._sum.money || 0,
          deliveredOrderCount,
          canceledOrderCount,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } finally {
        await prisma.$disconnect();
      }
    }