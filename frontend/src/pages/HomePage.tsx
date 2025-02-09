import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useStrings } from "@/hooks/useStrings";

function HomePage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["HOME_PAGE"]} />

      <div>
        <h1>Home page</h1>

        <Box className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="h-15 bg-gray-700 rounded-full"></div>
          <div className="h-15 bg-gray-700 rounded-full"></div>
        </Box>

        <div className="pt-4">
          <Button as="router-link" to="/x">
            Go to /x
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
