// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token =
//     request.cookies.get("__Secure-next-auth.session-token")?.value ||
//     request.cookies.get("next-auth.session-token")?.value;

//   const { pathname } = request.nextUrl;

//   // Allow public access to home
//   if (!token && pathname !== "/") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next|static|favicon.ico).*)"],
// };
