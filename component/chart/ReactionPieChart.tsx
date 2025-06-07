import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { fetchPosts } from "../../api/posts-api";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ReactionPieChart() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    fetchPosts(0, 200).then(({ posts }) => {
      let totalLikes = 0, totalDislikes = 0;
      posts.forEach(post => {
        totalLikes += post.reactions.likes;
        totalDislikes += post.reactions.dislikes;
      });
      setLikes(totalLikes);
      setDislikes(totalDislikes);
    });
  }, []);

  const options: ApexOptions = {
    labels: ["Likes", "Dislikes"],
    colors: ["#1E40AF", "#F87171"],
    legend: {
      position: "bottom",
    },
  };

  const series = [likes, dislikes];

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Reaction Breakdown</h2>
      <Chart options={options} series={series} type="pie" height={300} />
    </div>
  );
}
