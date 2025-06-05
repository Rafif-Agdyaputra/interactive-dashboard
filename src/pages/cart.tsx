import { GetServerSideProps } from "next";
import { fetchCarts, Cart } from "../../api/carts-api";

interface Props {
  carts: Cart[];
}

export default function CartsPage({ carts }: Props) {
  return (
    <div>
      <h1>Cart List</h1>
      {carts.map((cart) => (
        <div key={cart.id}>
          <h2>User ID: {cart.userId}</h2>
          <ul>
            {cart.products.map((product) => (
              <li key={product.id}>
                {product.title} - Qty: {product.quantity} - Total: ${product.total}
              </li>
            ))}
          </ul>
          <p>Total: ${cart.total} | Discounted: ${cart.discountedTotal}</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchCarts();

  return {
    props: {
      carts: data.carts,
    },
  };
};
