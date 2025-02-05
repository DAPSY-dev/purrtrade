import { useSelector } from "react-redux";
import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Stack from "@/components/Stack";
import Button from "@/components/Button";
import { RootState } from "@/store/reducers";

function NotFoundPage() {
  const {
    strings,
    loading: stringsLoading,
    error: stringsError,
  } = useSelector((state: RootState) => state.strings);

  if (stringsLoading) {
    return null;
  }

  if (stringsError) {
    console.error(stringsError);
    return null;
  }

  return (
    <>
      <SEO title={strings["TITLE_404"]} />

      <Box className="py-12">
        <Stack gap={2} className="place-items-center">
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
        </Stack>
      </Box>
    </>
  );
}

export default NotFoundPage;
