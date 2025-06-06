import Skeleton from "react-loading-skeleton";

export default function CartSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 animate-pulse">
      <div className="mb-4">
        <Skeleton width={120} height={28} />
        <Skeleton width={80} height={16} className="mt-1" />
      </div>

      <div className="flex items-center gap-4 mb-3">
        <Skeleton width={56} height={56} borderRadius={12} />
        <div className="flex-1">
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={16} className="mt-1" />
        </div>
      </div>

      <Skeleton width={100} height={16} className="mb-4" />

      <div className="space-y-1 text-right text-gray-400 text-sm">
        <Skeleton width={140} height={14} />
        <Skeleton width={120} height={14} />
        <Skeleton width={120} height={14} />
        <Skeleton width={160} height={16} />
      </div>

      <div className="mt-4 text-right">
        <Skeleton width={100} height={36} borderRadius={8} />
      </div>
    </div>
  );
}
