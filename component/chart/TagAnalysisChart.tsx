import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchPosts } from "../../api/posts-api";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TagCount {
  tag: string;
  count: number;
}

const TagAnalysisChart = () => {
  const [tagCounts, setTagCounts] = useState<TagCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostsAndAnalyzeTags = async () => {
      try {
        const response = await fetchPosts(0, 200);
        const posts = response.posts;

        const tagFrequency: Record<string, number> = {};
        posts.forEach(post => {
          post.tags.forEach(tag => {
            tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
          });
        });

        const tagCountArray: TagCount[] = Object.entries(tagFrequency)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setTagCounts(tagCountArray);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    loadPostsAndAnalyzeTags();
  }, []);

  const options = {
    chart: {
      id: "tag-frequency",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    xaxis: {
      categories: tagCounts.map(tc => tc.tag),
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "13px",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#1E3A8A"],
        fontWeight: 600,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    colors: ["#0ea5e9"],
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Frequency",
      data: tagCounts.map(tc => tc.count),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        POST - Top 5 Most Used Tags
      </h2>
      {loading ? (
        <ChartSkeleton/>
      ) : tagCounts.length === 0 ? (
        <p className="text-gray-500">No tags found.</p>
      ) : (
        <Chart options={options} series={series} type="bar" height={350} />
      )}
    </div>
  );
}

export default TagAnalysisChart;
