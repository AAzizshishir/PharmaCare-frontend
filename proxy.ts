import { NextRequest, NextResponse } from "next/server";
import { UsersService } from "./services/users.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);

  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  const { data } = await UsersService.getSession();
  console.log(data);
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // for admin
  if (isAdmin && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isAdmin && pathname.startsWith("/my-review")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isAdmin && pathname.startsWith("/my-orders")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isAdmin && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // for seller
  if (data) {
    isAuthenticated = true;
    isSeller = data.user.role === Roles.seller;
  }

  if (isSeller && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }
  if (isSeller && pathname.startsWith("/my-review")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }
  if (isSeller && pathname.startsWith("/my-orders")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }
  if (isSeller && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  // for customer
  if (data) {
    isAuthenticated = true;
    isCustomer = data.user.role === Roles.customer;
  }
  if (isCustomer && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isCustomer && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/my-review",
    "/my-orders",
    "/cart",
  ],
};
