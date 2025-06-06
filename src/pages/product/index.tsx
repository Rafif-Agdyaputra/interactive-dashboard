import { GetServerSideProps } from "next";
import { fetchProducts, Product } from "../../../api/products-api";

interface Props {
  products: Product[];
}

export default function ProductPage({ products }: Props) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProducts();

  return {
    props: {
      products: data.products,
    },
  };
};