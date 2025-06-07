import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchCarts } from "../../api/carts-api";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UserSpending {
  userId: number;
  totalSpending: number;
}

const MostSpendingUsersChart = () => {
  const [userData, setUserData] = useState<UserSpending[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const { carts } = await fetchCarts(0, 200);
      const spendingMap: Record<number, number> = {};

      carts.forEach((cart) => {
        spendingMap[cart.userId] = (spendingMap[cart.userId] || 0) + cart.total;
      });

      const sorted = Object.entries(spendingMap)
        .map(([userId, totalSpending]) => ({
          userId: Number(userId),
          totalSpending,
        }))
        .sort((a, b) => b.totalSpending - a.totalSpending)
        .slice(0, 5);

      setUserData(sorted);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const colors = ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"];

  const options = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: userData.map((u) => `User ${u.userId}`),
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    yaxis: {
      title: {
        text: "Total Spending",
        style: { fontWeight: "bold", color: "#1E3A8A" },
      },
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
      },
    },
    dataLabels: { enabled: true },
    grid: { borderColor: "#e5e7eb" },
    colors: colors.slice(0, userData.length),
  };

  const series = [
    {
      name: "Total Spending",
      data: userData.map((u) => u.totalSpending),
    },
  ];

  if (loading) return <ChartSkeleton />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Top 5 Most Spending Users
      </h3>
      <Chart options={options as any} series={series} type="bar" height={350} />
    </div>
  );
}

export default MostSpendingUsersChart;