import { NavRoute, Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboards",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Add Medicine",
        url: "/add-medicine",
      },
      {
        title: "My Medicine",
        url: "/my-medicine",
      },
      {
        title: "Orders",
        url: "/seller-orders",
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
