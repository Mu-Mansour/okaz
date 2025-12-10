import { requireAdmin } from "@/lib/auth-guard";
import ProductForm from "./createProductForm/ProductForm";

const AdminCreateProductPage = async () => {
  await requireAdmin();

  return (
    <div>
      <ProductForm type='Create' />
    </div>
  );
};

export default AdminCreateProductPage;
