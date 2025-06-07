import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchProducts } from "../../api/products-api";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CategoryCount {
  category: string;
  count: number;
}

const ProductCategoryChart = () => {
  const [categoryData, setCategoryData] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAndProcess = async () => {
      setLoading(true);
      try {
        const { products } = await fetchProducts("", 300);
        const counts: Record<string, number> = {};

        products.forEach((p) => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });

        const sorted = Object.entries(counts)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);

        setCategoryData(sorted);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    loadAndProcess();
  }, []);

  const colors = ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: categoryData.map((c) => c.category),
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    yaxis: {
      title: { text: "Total Products", style: { fontWeight: "bold" } },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
      },
    },
    dataLabels: { enabled: true },
    colors: colors.slice(0, categoryData.length),
  };

  const series = [
    {
      name: "Products",
      data: categoryData.map((c) => c.count),
    },
  ];

  if (loading) return <ChartSkeleton/>
  

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Product Count by Category
      </h3>
      <Chart options={options as any} series={series} type="bar" height={350} />
    </div>
  );
}

export default ProductCategoryChart;