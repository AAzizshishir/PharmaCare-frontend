import { NavRoute, Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboards",
    items: [
      {
        title: "add-medicine",
        url: "/addMedicine",
      },
      {
        title: "orders",
        url: "/orders",
      },
    ],
  },
];

export const sellerNavRoutes: NavRoute[] = [
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
    url: "/seller-dashboard",
  },
];
