import { NavRoute, Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "users",
        url: "/users",
      },
      {
        title: "orders",
        url: "/orders",
      },
    ],
  },
];

export const adminNavRoutes: NavRoute[] = [
  { title: "Home", url: "/" },

  {
    title: "Medicine",
    url: "/medicine",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Dashboard",
    url: "/admin-dashboard",
  },
];
