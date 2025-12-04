import ProductList from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/productActions";
export const revalidate = 10;
export const metadata = {
  title: "Home",
};
export default async function Home() {
  const products = (await getLatestProducts()).map((product) => {
    return {
      ...product,
      price: product.price.toString(),
      rating: Number(product.rating),
    };
  });
  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={products} limit={6} />
    </div>
  );
}
