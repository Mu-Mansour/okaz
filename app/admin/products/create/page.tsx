import { requireAdmin } from "@/lib/auth-guard";

const AdminCreateProductPage = async () => {
  await requireAdmin();

  return (
    <div>
      <h1 className='h2-bold'>Create Product</h1>
    </div>
  );
};

export default AdminCreateProductPage;
