import { requireAdmin } from "@/lib/auth-guard";

const AdminUserDetailsPage = async () => {
  await requireAdmin();

  return (
    <div>
      <h1 className='h2-bold'>User Details</h1>
    </div>
  );
};

export default AdminUserDetailsPage;
