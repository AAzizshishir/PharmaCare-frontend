import { NavRoute, Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Medicines",
        url: "/medicines",
      },
      {
        title: "Categories",
        url: "/categories",
      },
      {
        title: "Users",
        url: "/users",
      },
      {
        title: "Orders",
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
