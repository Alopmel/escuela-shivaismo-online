import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnProfile = request.nextUrl.pathname.startsWith("/portal");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/portal/dashboard/profile");

  if (isOnProfile) {
    if (!user)
      return NextResponse.redirect(new URL("/home", request.nextUrl));
    if (isOnAdminArea && !user.isAdmin)
      return NextResponse.redirect(new URL("/portal/dashboard/profile", request.nextUrl));
    return response;
  } else if (user) {
    return NextResponse.redirect(new URL("/portal", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

