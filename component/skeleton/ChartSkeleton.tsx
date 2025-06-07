import React from "react";
import Skeleton from "react-loading-skeleton";

const ChartSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <Skeleton height={24} width={200} />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={20} />
        ))}
      </div>
    </div>
  );
}

export default ChartSkeleton;