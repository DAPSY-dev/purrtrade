import SEO from "@/components/SEO";
// import Box from "@/components/Box";
// import Button from "@/components/Button";
import { useStrings } from "@/hooks/useStrings";

function RegisterPage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["REGISTER"]} />

      <h1>{strings["REGISTER"]}</h1>
    </>
  );
}

export default RegisterPage;
