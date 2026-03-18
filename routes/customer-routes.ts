// import { NavRoute } from "@/types";

// export const customerNavRoutes: NavRoute[] = [
//   { title: "Home", url: "/" },

//   {
//     title: "Medicine",
//     url: "/medicine",
//   },
//   {
//     title: "About",
//     url: "/about",
//   },
//   {
//     title: "My Cart",
//     url: "/cart",
//   },
//   {
//     title: "My Order",
//     url: "/my-orders",
//   },
//   {
//     title: "My Review",
//     url: "/my-review",
//   },
// ];

import { NavRoute, Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      { title: "Home", url: "/" },
      {
        title: "My Cart",
        url: "/cart",
      },
      {
        title: "My Order",
        url: "/my-orders",
      },
      {
        title: "My Review",
        url: "/my-review",
      },
    ],
  },
];

export const customerNavRoutes: NavRoute[] = [
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
    url: "/customer-dashboard",
  },
];
