import SEO from "@/components/SEO";
// import Box from "@/components/Box";
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

      <h1>{strings["LOGIN"]}</h1>
    </>
  );
}

export default LoginPage;
