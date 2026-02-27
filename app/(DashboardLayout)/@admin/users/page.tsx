import UserCard from "@/components/userCard";
import { cookies } from "next/headers";
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const UsersPage = async () => {
  const cookieStore = await cookies();
  const usersRes = await fetch(`${PUBLIC_API_URL}/api/admin/users`, {
    next: { revalidate: 60 },
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const data = await usersRes.json();
  const users = data.data;

  return (
    <div>
      <UserCard userRes={users} />
    </div>
  );
};

export default UsersPage;
