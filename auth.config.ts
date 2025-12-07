import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request }: any) {
      // Check for cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // make a new cart cookie
        const sessionCartId = crypto.randomUUID();

        // copy the request headers
        const newRequestHeaders = new Headers(request.headers);

        // make a new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // add the cookie with the generated sessionCartId to the response
        response.cookies.set("sessionCartId", sessionCartId);

        // return the response with the sessionCartId set
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
