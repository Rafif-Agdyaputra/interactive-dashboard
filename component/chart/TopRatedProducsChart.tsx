import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchProducts, Product } from "../../api/products-api";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TopRatedProductsChart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { products } = await fetchProducts("", 100, 0, "rating", "desc");
        const topFive = products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);
        setProducts(topFive);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: products.map(p => p.title),
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Rating",
        style: { fontWeight: 600, color: "#1E3A8A" },
      },
      max: 5,
      min: 0,
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toFixed(1),
    },
    colors: ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"],
  };

  const series = [
    {
      name: "Rating",
      data: products.map(p => p.rating),
    },
  ];

  if (loading) return <ChartSkeleton />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Top 5 Highest Rated Products
      </h3>
      <Chart options={options as any} series={series} type="bar" height={350} />
    </div>
  );
}

export default TopRatedProductsChart;
