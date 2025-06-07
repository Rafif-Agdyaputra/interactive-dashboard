import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { fetchPosts } from "../../api/posts-api";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LikesLineChart() {
  const [data, setData] = useState<{ title: string; likes: number }[]>([]);

  useEffect(() => {
    fetchPosts(0, 10).then(({ posts }) => {
      const sorted = posts
        .sort((a, b) => b.reactions.likes - a.reactions.likes)
        .slice(0, 10)
        .map(post => ({ title: post.title, likes: post.reactions.likes }));
      setData(sorted);
    });
  }, []);

  const options: ApexOptions = {
    chart: { id: "likes-line", toolbar: { show: false } },
    xaxis: {
      categories: data.map(d => d.title.slice(0, 10) + "..."),
      labels: { rotate: -45 },
    },
    colors: ["#6366F1"],
    stroke: { curve: "smooth" },
    markers: { size: 4 },
  };

  const series = [{ name: "Likes", data: data.map(d => d.likes) }];

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Top 10 Posts by Likes</h2>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}
