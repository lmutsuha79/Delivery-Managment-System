import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const ChartOverView = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("/api/get-overview-chart-data");
        const data = await response.json();
        setChartData(data.chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChartData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const dailyEarningsChartData = {
    labels: chartData.days?.map((item) => item.key),
    datasets: [
      {
        label: "Earnings",
        data: chartData.days?.map((item) => item.earnings),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dailyOrdersChartData = {
    labels: chartData.days?.map((item) => item.key),
    datasets: [
      {
        label: "Number of Orders",
        data: chartData.days?.map((item) => item.orders),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyEarningsChartData = {
    labels: chartData.weeks?.map((item) => item.key),
    datasets: [
      {
        label: "Earnings",
        data: chartData.weeks?.map((item) => item.earnings),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyOrdersChartData = {
    labels: chartData.weeks?.map((item) => item.key),
    datasets: [
      {
        label: "Number of Orders",
        data: chartData.weeks?.map((item) => item.orders),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthlyEarningsChartData = {
    labels: chartData.months?.map((item) => item.key),
    datasets: [
      {
        label: "Earnings",
        data: chartData.months?.map((item) => item.earnings),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthlyOrdersChartData = {
    labels: chartData.months?.map((item) => item.key),
    datasets: [
      {
        label: "Number of Orders",
        data: chartData.months?.map((item) => item.orders),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yearlyEarningsChartData = {
    labels: chartData.years?.map((item) => item.key),
    datasets: [
      {
        label: "Earnings",
        data: chartData.years?.map((item) => item.earnings),
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgba(255, 205, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yearlyOrdersChartData = {
    labels: chartData.years?.map((item) => item.key),
    datasets: [
      {
        label: "Number of Orders",
        data: chartData.years?.map((item) => item.orders),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="chart-container overflow-x-scroll">
        <div>
          <h2 className="text-primary_color underline">Daily Info</h2>
          <div className="flex items-center gap-4 flex-col">
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Daily Earnings</h2>
                <Bar data={dailyEarningsChartData} options={chartOptions} />
              </div>
            </div>
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Daily Number of Orders</h2>
                <Bar data={dailyOrdersChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container overflow-x-scroll">
        <div>
          <h2 className="text-primary_color underline">Weekly Info</h2>
          <div className="flex items-center gap-4 flex-col">
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Weekly Earnings</h2>
                <Bar data={weeklyEarningsChartData} options={chartOptions} />
              </div>
            </div>
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Weekly Number of Orders</h2>
                <Bar data={weeklyOrdersChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container overflow-x-scroll">
        <div>
          <h2 className="text-primary_color underline">Monthly Info</h2>
          <div className="flex items-center gap-4 flex-col">
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Earnings</h2>
                <Bar data={monthlyEarningsChartData} options={chartOptions} />
              </div>
            </div>
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Number of Orders</h2>
                <Bar data={monthlyOrdersChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container overflow-x-scroll">
        <div>
          <h2 className="text-primary_color underline">Yearly Info</h2>
          <div className="flex items-center gap-4 flex-col">
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Yearly Earnings</h2>
                <Bar data={yearlyEarningsChartData} options={chartOptions} />
              </div>
            </div>
            <div className="w-full">
              <div className="chart">
                <h2 className="text-sm text-center">Yearly Number of Orders</h2>
                <Bar data={yearlyOrdersChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOverView;
