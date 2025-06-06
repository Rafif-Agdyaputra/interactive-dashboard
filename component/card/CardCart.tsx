import { Cart } from "../../api/carts-api";

const CardCart = (cart: Cart) => {
  const firstProduct = cart.products[0];
  const remainingCount = cart.products.length - 1;

  return (
    <div
      key={cart?.id}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-6 flex flex-col justify-between"
    >
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-800">Cart ID-{cart.id}</h2>
          <p className="text-sm text-gray-500">User ID: {cart.userId}</p>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <img
            src={firstProduct.thumbnail}
            alt={firstProduct.title}
            className="w-14 h-14 object-cover rounded-lg border"
          />
          <div>
            <p className="font-semibold text-gray-800">{firstProduct.title}</p>
            <p className="text-sm text-gray-600">
              Qty: {firstProduct.quantity} | ${firstProduct.total}
            </p>
          </div>
        </div>

        {remainingCount > 0 && (
          <p className="text-sm text-blue-500 mb-2">
            +{remainingCount} more{" "}
            {remainingCount === 1 ? "product" : "products"}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-700 space-y-1 text-right">
        <p>
          Total Products:{" "}
          <span className="font-semibold">{cart.totalProducts}</span>
        </p>
        <p>
          Total Price:{" "}
          <span className="font-semibold text-gray-900">
            $
            {cart.total.toLocaleString("en-US", {
              useGrouping: false,
            })}
          </span>
        </p>
        <p>
          Discount:{" "}
          <span className="font-semibold text-red-600">
            $
            {(cart.total - cart.discountedTotal).toLocaleString("en-US", {
              useGrouping: false,
            })}
          </span>
        </p>
        <p>
          Total After Discount:{" "}
          <span className="font-bold text-green-600">
            $
            {cart.discountedTotal.toLocaleString("en-US", {
              useGrouping: false,
            })}
          </span>
        </p>
      </div>

      <div className="mt-4 text-right">
        <a
          href={`/cart/${cart.id}`}
          className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Show Detail
        </a>
      </div>
    </div>
  );
};

export default CardCart;
