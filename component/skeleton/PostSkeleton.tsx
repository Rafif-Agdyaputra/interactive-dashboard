import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <Skeleton height={24} width="75%" />
      <Skeleton height={14} count={2} />
      <Skeleton height={12} width="60%" />
      <Skeleton height={12} width="40%" />
    </div>
  );
}
