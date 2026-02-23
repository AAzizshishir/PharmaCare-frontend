// import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UsersService = {
  //   getUsers: async function () {
  //     const cookieStore = await cookies();
  //     try {
  //       const result = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users`, {
  //         next: { revalidate: 60 },
  //         headers: {
  //           cookie: cookieStore.toString(),
  //         },
  //       });
  //       const data = await result.json();
  //       if (data.success) {
  //         return data;
  //       } else {
  //         return { error: { message: data.message || "Failed" } };
  //       }
  //     } catch (error) {
  //       return { data: null, error: { message: "Something Went Wrong" } };
  //     }
  //   },

  updateUserStatus: async function (id: string, status: string) {
    try {
      const result = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/user/${id}`,
        {
          next: { revalidate: 60 },
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        },
      );
      const data = await result.json();
      if (data.success) {
        return data;
      } else {
        return { error: { message: data.message || "Failed" } };
      }
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
