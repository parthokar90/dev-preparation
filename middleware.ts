import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Root and Dashboard components are protected
const protectedRoutes = [
    "/dashboard",
];

const publicRoutes = [
    "/login",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "token";
    const token = request.cookies.get(cookieName)?.value;

    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Root route checking context
    if (pathname === "/" && !token) {
        return NextResponse.next(); // Home layout bypass public access view allowed
    }

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|assets|api).*)",
    ],
};