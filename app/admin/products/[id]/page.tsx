import { requireAdmin } from "@/lib/auth-guard";

const AdminProductDetailsPage = async () => {
  await requireAdmin();

  return (
    <div>
      <h1 className='h2-bold'>Product Details</h1>
    </div>
  );
};

export default AdminProductDetailsPage;
