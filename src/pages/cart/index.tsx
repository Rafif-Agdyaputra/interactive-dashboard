import { useEffect, useState } from "react";
import { fetchCarts, Cart } from "../../../api/carts-api";
import CartSkeleton from "../../../component/skeleton/CartSkeleton";
import CardCart from "../../../component/card/CardCart";
import ButtonLoadMore from "../../../component/button/ButtonLoadMore";

export default function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 6;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchCarts(skip, limit);
      setCarts((prev) => [...prev, ...data.carts]);
      setSkip((prev) => prev + limit);
      if (skip + limit >= data.total) setHasMore(false);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Cart Overview</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && carts.length === 0 && (
          <>
            {[...Array(limit)].map((_, i) => (
              <CartSkeleton key={i} />
            ))}
          </>
        )}

        {carts.map((cart) => (
          <CardCart key={cart.id} {...cart} />
        ))}
      </div>

      {hasMore && (
        <ButtonLoadMore onClick={loadMore} loading={loading} />
      )}
    </div>
  );
}
