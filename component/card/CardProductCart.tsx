import { CartProduct } from "../../api/carts-api";

const CardProductCart = (product: CartProduct) => {
  return (
    <div
      key={product.id}
      className="bg-white shadow hover:shadow-lg rounded-xl overflow-hidden p-4 flex flex-col transition-all duration-300"
    >
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden mb-3 rounded-md">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {product.title}
      </h2>
      <div className="text-sm text-gray-600 space-y-1 mt-auto">
        <p>
          Quantity: <span className="font-medium">{product.quantity}</span>
        </p>
        <p>
          Price: <span className="font-medium">${product.price}</span>
        </p>
        <p className="text-blue-700 font-bold">
          Total: ${product.total.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default CardProductCart;
