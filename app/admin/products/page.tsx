import { requireAdmin } from "@/lib/auth-guard";

const AdminProductsPage = async () => {
  await requireAdmin();

  return (
    <div>
      <h1 className='h2-bold'>Products</h1>
    </div>
  );
};

export default AdminProductsPage;
