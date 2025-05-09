import SEO from "@/components/SEO";
import Heading from "@/components/Heading";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function NotFoundPage() {
  const strings = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["TITLE_404"]} />

      <div className="grid place-items-center gap-2 py-12 md:py-12">
        <Heading className="text-center text-6xl md:text-6xl">
          {strings["TITLE_404"]}
        </Heading>

        <p className="text-center text-2xl">
          {strings["OOPS"]} {strings["PAGE_NOT_FOUND"]}
        </p>

        <p className="text-center text-lg">
          {strings["PAGE_MIGHT_BE_MOVED_OR_DELETED"]}
        </p>

        <CTA as="router-link" variant="button" to="/" className="mt-4">
          {strings["GO_BACK_HOME"]}
        </CTA>
      </div>
    </>
  );
}

export default NotFoundPage;
