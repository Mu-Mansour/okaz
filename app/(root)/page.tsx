import DealCountdown from "@/components/DealCountdown";
import IconBoxes from "@/components/IconBoxes";
import { ProductCarousel } from "@/components/shared/product/ProductCarousel";
import ProductList from "@/components/shared/product/ProductList";
import ViewAllProductsButton from "@/components/ViewAllProductsButton";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/productActions";
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
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className='space-y-8'>
      {featuredProducts.length > 0 && (
        <ProductCarousel
          data={products.map((p) => ({
            ...p,
            rating: Number(p.rating),
          }))}
        />
      )}
      <ProductList title='Newest Arrivals' data={products} limit={6} />
      <ViewAllProductsButton />
      <IconBoxes />
      <DealCountdown />
    </div>
  );
}
