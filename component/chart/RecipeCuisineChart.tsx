import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchRecipes } from "../../api/recipes-api";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CuisineCount {
  cuisine: string;
  count: number;
}

const RecipeCuisineChart = () => {
  const [cuisineData, setCuisineData] = useState<CuisineCount[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAndProcessData = async () => {
    setLoading(true);
    try {
      const { recipes } = await fetchRecipes(0, 200);
      const cuisineCount: Record<string, number> = {};

      recipes.forEach((recipe) => {
        const cuisine = recipe.cuisine;
        cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
      });

      const sorted = Object.entries(cuisineCount)
        .map(([cuisine, count]) => ({ cuisine, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setCuisineData(sorted);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAndProcessData();
  }, []);

  const colors = ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: cuisineData.map((cd) => cd.cuisine),
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    yaxis: {
      title: {
        text: "Total Recipes",
        style: { fontWeight: "bold", color: "#1E3A8A" },
      },
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    colors: colors,
    dataLabels: { enabled: true },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
      },
    },
    grid: { borderColor: "#e5e7eb" },
  };

  const series = [
    {
      name: "Recipes",
      data: cuisineData.map((cd) => cd.count),
    },
  ];

  if (loading) return <ChartSkeleton />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Top 5 Cuisine by Recipe Count
      </h3>
      <Chart options={options as any} series={series} type="bar" height={350} />
    </div>
  );
};

export default RecipeCuisineChart;
