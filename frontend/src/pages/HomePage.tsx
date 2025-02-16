import SEO from "@/components/SEO";
import Box from "@/components/Box";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function HomePage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["HOME"]} />

      <div>
        <h1>{strings["HOME"]}</h1>

        <Box className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="h-15 bg-gray-700 rounded-md"></div>
          <div className="h-15 bg-gray-700 rounded-md"></div>
        </Box>

        <div className="pt-4">
          <CTA as="router-link" variant="link" to="/x">
            Go to /x
          </CTA>
        </div>
      </div>
    </>
  );
}

export default HomePage;
