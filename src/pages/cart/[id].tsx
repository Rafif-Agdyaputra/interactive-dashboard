import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchCartById, Cart } from "../../../api/carts-api";
import CardProductCart from "../../../component/card/CardProductCart";

interface Props {
  cart: Cart | null;
}

export default function CartDetailPage({ cart }: Props) {
  const router = useRouter();

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-gray-50 px-4">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-red-600">Cart Not Found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 transition-all">
          Cart Detail - ID-{cart.id}
        </h1>
        <p className="text-gray-500 text-sm md:text-base">User ID: {cart.userId}</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {cart.products.map((product) => (
          <CardProductCart {...product} />
        ))}
      </section>

      <aside className="bg-white rounded-lg p-4 shadow-md text-gray-700 text-sm md:text-base space-y-2">
        <p>
          Total Products: <span className="font-semibold">{cart.totalProducts}</span>
        </p>
        <p>
          Total Price:{" "}
          <span className="font-semibold text-gray-900">
            ${cart.total.toLocaleString("en-US")}
          </span>
        </p>
        <p>
          Discount:{" "}
          <span className="font-semibold text-red-600">
            ${(cart.total - cart.discountedTotal).toLocaleString("en-US")}
          </span>
        </p>
        <p>
          Total After Discount:{" "}
          <span className="font-bold text-green-600">
            ${cart.discountedTotal.toLocaleString("en-US")}
          </span>
        </p>
      </aside>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const cart = await fetchCartById(Number(id));

  return {
    props: {
      cart: cart || null,
    },
  };
};
