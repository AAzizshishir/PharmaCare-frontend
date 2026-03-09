import { getAllUsersForAdmin } from "@/app/actions/user.actions";
import UserCard from "@/components/userCard";

const UsersPage = async () => {
  const result = await getAllUsersForAdmin();
  const users = result?.data;

  return (
    <div>
      <UserCard userRes={users} />
    </div>
  );
};

export default UsersPage;
