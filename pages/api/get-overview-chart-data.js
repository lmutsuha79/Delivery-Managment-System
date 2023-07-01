import prisma from "@/lib/prisma";

// pages/api/chartData.js

export default async function handler(req, res) {
  try {
    const ordersData = await prisma.order.findMany({
      select: {
        createdAt: true,
        money: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Calculate the number of orders and earnings over months, weeks, and days
    const chartData = {
      months: [],
      weeks: [],
      days: [],
    };

    ordersData.forEach((order) => {
      const createdAt = new Date(order.createdAt);

      // Format the date to YYYY-MM format for months and YYYY-WW format for weeks
      const monthKey = createdAt.toISOString().substring(0, 7);
      const weekKey = `${createdAt.getFullYear()}-W${getISOWeek(createdAt)}`;

      // Update the chart data for months
      if (!chartData.months.find((item) => item.key === monthKey)) {
        chartData.months.push({ key: monthKey, orders: 0, earnings: 0 });
      }
      chartData.months.find((item) => item.key === monthKey).orders++;
      chartData.months.find((item) => item.key === monthKey).earnings +=
        order.money;

      // Update the chart data for weeks
      if (!chartData.weeks.find((item) => item.key === weekKey)) {
        chartData.weeks.push({ key: weekKey, orders: 0, earnings: 0 });
      }
      chartData.weeks.find((item) => item.key === weekKey).orders++;
      chartData.weeks.find((item) => item.key === weekKey).earnings +=
        order.money;

      // Update the chart data for days
      const dayKey = createdAt.toISOString().substring(0, 10);
      if (!chartData.days.find((item) => item.key === dayKey)) {
        chartData.days.push({ key: dayKey, orders: 0, earnings: 0 });
      }
      chartData.days.find((item) => item.key === dayKey).orders++;
      chartData.days.find((item) => item.key === dayKey).earnings +=
        order.money;
    });

    res.status(200).json({ chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    prisma.$disconnect();
  }
}

// Helper function to calculate the ISO week number
function getISOWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
