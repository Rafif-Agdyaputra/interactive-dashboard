import Skeleton from "react-loading-skeleton";

const CardLikedPostSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-blue-200 rounded-3xl shadow-md p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        <Skeleton width={200} height={32} />
      </h1>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        <Skeleton width={`80%`} height={24} />
      </h2>

      <p className="text-gray-600 mb-4">
        <Skeleton count={3} />
      </p>

      <div className="flex gap-2 mb-4">
        <Skeleton width={60} height={20} borderRadius={12} />
        <Skeleton width={60} height={20} borderRadius={12} />
        <Skeleton width={60} height={20} borderRadius={12} />
      </div>

      <div className="flex gap-4 text-sm text-gray-500">
        <Skeleton width={100} height={20} />
      </div>
    </div>
  );
};

export default CardLikedPostSkeleton;
