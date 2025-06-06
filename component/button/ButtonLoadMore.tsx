type ButtonLoadMoreType = {
    onClick: () => void,
    loading: boolean
}

const ButtonLoadMore = ({onClick, loading}: ButtonLoadMoreType) => {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default ButtonLoadMore;
