import createMiddleware from "next-intl/middleware";
import { routing } from "@i18n/routing";
import { auth } from "@lib/auth";

const i18nMiddleware = createMiddleware(routing);

export default auth((request) => {
  return i18nMiddleware(request);
});

export const config = {
  // Match all pathnames except for:
  // - if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
