import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useStrings } from "@/hooks/useStrings";

function NotFoundPage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["TITLE_404"]} />

      <Box className="grid place-items-center gap-2 py-12">
        <h1 className="font-bold text-6xl text-gray-700 text-center">
          {strings["TITLE_404"]}
        </h1>

        <p className="text-2xl text-gray-700 text-center">
          {strings["OOPS"]} {strings["PAGE_NOT_FOUND"]}
        </p>

        <p className="text-lg text-gray-700 text-center">
          {strings["PAGE_MIGHT_BE_MOVED_OR_DELETED"]}
        </p>

        <Button as="router-link" to="/" className="mt-4">
          {strings["GO_BACK_HOME"]}
        </Button>
      </Box>
    </>
  );
}

export default NotFoundPage;
