import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  const sessionData =
    request.cookies.get("__Secure-better-auth.session_data")?.value ||
    request.cookies.get("better-auth.session_data")?.value;

  // If either cookie is missing, redirect
  if (!sessionToken || !sessionData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Parse session_data (Better Auth stores JSON here)
  let parsedData: any;

  try {
    const decoded = Buffer.from(sessionData, "base64").toString("utf-8");
    parsedData = JSON.parse(decoded);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Extract role directly from parsedData
  const role = parsedData?.session?.user?.role;
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based restrictions
  if (role === Roles.admin) {
    if (
      pathname.startsWith("/seller-dashboard") ||
      pathname.startsWith("/customer-dashboard") ||
      pathname.startsWith("/add-medicine") ||
      pathname.startsWith("/my-medicine") ||
      pathname.startsWith("/seller-orders") ||
      pathname.startsWith("/seller-medicine-review") ||
      pathname.startsWith("/my-review") ||
      pathname.startsWith("/my-orders") ||
      pathname.startsWith("/cart")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (role === Roles.seller) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/customer-dashboard") ||
      pathname.startsWith("/categories") ||
      pathname.startsWith("/users") ||
      pathname.startsWith("/admin-orders") ||
      pathname.startsWith("/my-review") ||
      pathname.startsWith("/my-orders") ||
      pathname.startsWith("/cart")
    ) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
  }

  if (role === Roles.customer) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/seller-dashboard") ||
      pathname.startsWith("/add-medicine") ||
      pathname.startsWith("/my-medicine") ||
      pathname.startsWith("/seller-orders") ||
      pathname.startsWith("/seller-medicine-review") ||
      pathname.startsWith("/categories") ||
      pathname.startsWith("/users") ||
      pathname.startsWith("/admin-orders")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
    "/add-medicine",
    "/my-medicine",
    "/seller-orders",
    "/seller-medicine-review",
    "/categories",
    "/users",
    "/admin-orders",
    "/my-review",
    "/my-orders",
    "/cart",
  ],
};
