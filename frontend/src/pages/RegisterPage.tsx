import { FormEvent } from "react";
import SEO from "@/components/SEO";
import Box from "@/components/Box";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function RegisterPage() {
  const { strings } = useStrings();

  if (strings === null) {
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <SEO title={strings["REGISTER"]} />

      <Box className="grid gap-6">
        <Heading>{strings["REGISTER"]}</Heading>

        <form
          onClick={handleSubmit}
          className="grid gap-4 mx-auto w-full max-w-3xl"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input type="text" label={strings["NAME"]} />
            <Input type="email" label={strings["EMAIL"]} />
            <Input type="password" label={strings["PASSWORD"]} />
            <Input type="password" label={strings["REPEAT_PASSWORD"]} />
          </div>

          <div className="text-center">
            <CTA
              variant="button"
              type="submit"
              className="w-full md:w-auto md:min-w-3xs"
            >
              {strings["REGISTER"]}
            </CTA>
          </div>
        </form>
      </Box>
    </>
  );
}

export default RegisterPage;
