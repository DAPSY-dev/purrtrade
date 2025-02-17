import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Heading from "@/components/Heading";
// import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function LoginPage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["LOGIN"]} />

      <Box className="grid sm:grid-cols-2 gap-4 mt-4">
        <Heading as="h1">{strings["LOGIN"]}</Heading>
      </Box>
    </>
  );
}

export default LoginPage;
