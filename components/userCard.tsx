"use client";

import { UserType } from "@/types/user.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import { UsersService } from "@/services/users.service";

const UserCard = ({ userRes }: { userRes: UserType[] }) => {
  const [users, setUsers] = useState<UserType[]>(userRes);

  const handleToggleStatus = async (user: UserType) => {
    const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

    await UsersService.updateUserStatus(user.id, newStatus);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
    );
  };

  return (
    <div>
      <Table>
        <TableCaption>List of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((userData) => (
            <TableRow key={userData.id}>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.email}</TableCell>
              <TableCell>{userData.role}</TableCell>
              <TableCell>{userData.status}</TableCell>
              <TableCell>
                <Button
                  className="bg-blue-400 hover:bg-blue-500 cursor-pointer"
                  onClick={() => handleToggleStatus(userData)}
                >
                  {userData.status === "ACTIVE" ? "Ban" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserCard;
