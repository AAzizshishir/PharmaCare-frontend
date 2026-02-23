import { UsersService } from "@/services/users.service";

const Users = async () => {
  const data = await UsersService.getUsers();
  console.log(data);
  return <div>Users</div>;
};

export default Users;
