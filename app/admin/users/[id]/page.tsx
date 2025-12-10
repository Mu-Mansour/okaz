import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/userActions";
import UpdateUserForm from "./updateUserForm/updateUserForm";

export const metadata: Metadata = {
  title: "Update user",
};
const AdminUserDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div>
      <h1 className='h2-bold'>Update User Details</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default AdminUserDetailsPage;
