import SEO from "@/components/SEO";
// import Box from "@/components/Box";
import Heading from "@/components/Heading";
// import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function RegisterPage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["REGISTER"]} />

      <Heading as="h1">{strings["REGISTER"]}</Heading>
    </>
  );
}

export default RegisterPage;
