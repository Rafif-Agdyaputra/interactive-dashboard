import { useState, useEffect, useMemo } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import {
  fetchProducts,
  Product,
  ProductResponse,
} from "../../../api/products-api";
import ProductSkeleton from "../../../component/skeleton/ProductSkeleton";

const Star = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={"full" + i} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={"empty" + i} className="text-yellow-400" />
      ))}
    </>
  );
};

export default function ProductPage() {
  const limit = 9;
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const data: ProductResponse = await fetchProducts(
        debouncedSearch,
        limit,
        skip,
        sortBy,
        order
      );
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, sortBy, order]);

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const paginationButtons = useMemo(() => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          disabled={i === page}
          className={`px-3 py-1 rounded-md border ${
            i === page
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }, [page, totalPages]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setPage(1);
            setSortBy(e.target.value as "price" | "rating");
          }}
          className="border rounded-md px-4 py-2 w-full md:w-1/4"
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <select
          value={order}
          onChange={(e) => {
            setPage(1);
            setOrder(e.target.value as "asc" | "desc");
          }}
          className="border rounded-md px-4 py-2 w-full md:w-1/4"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, i) => (
            <li key={i}>
              <ProductSkeleton />
            </li>
          ))}
        </ul>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">${product.price}</span>
                <span className="text-yellow-500 flex items-center space-x-1">
                  <Star rating={product.rating} />
                  <span className="ml-2 text-gray-600 text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-blue-700 font-medium">
                <span className="bg-blue-100 rounded-full px-2 py-1">
                  #{product.category}
                </span>
                <span className="bg-blue-100 rounded-full px-2 py-1">
                  #{product.brand}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-md border bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50"
        >
          Prev
        </button>
        {paginationButtons}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md border bg-white text-blue-600 hover:bg-blue-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
