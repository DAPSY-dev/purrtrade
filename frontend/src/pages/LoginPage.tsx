import { FormEvent } from "react";
import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function LoginPage() {
  const strings = useStrings();

  if (strings === null) {
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <SEO title={strings["LOGIN"]} />

      <Box className="grid gap-6">
        <Heading>{strings["LOGIN"]}</Heading>

        <form
          onClick={handleSubmit}
          className="mx-auto grid w-full max-w-3xl gap-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input type="email" label={strings["EMAIL"]} />
            <Input type="password" label={strings["PASSWORD"]} />
          </div>

          <div className="text-center">
            <CTA
              variant="button"
              type="submit"
              className="w-full md:w-auto md:min-w-3xs"
            >
              {strings["LOGIN"]}
            </CTA>
          </div>
        </form>
      </Box>
    </>
  );
}

export default LoginPage;
