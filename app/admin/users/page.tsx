import { requireAdmin } from "@/lib/auth-guard";

const AdminUsersPage = async () => {
  await requireAdmin();

  return (
    <div>
      <h1 className='h2-bold'>Users</h1>
    </div>
  );
};

export default AdminUsersPage;
