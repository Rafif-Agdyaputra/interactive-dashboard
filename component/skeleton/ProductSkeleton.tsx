const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md p-4 flex flex-col">
      <div className="bg-gray-300 rounded-lg h-40 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="flex justify-between mb-2">
        <div className="h-6 bg-gray-300 rounded w-16"></div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-300 rounded-full w-16"></div>
        <div className="h-5 bg-gray-300 rounded-full w-16"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
