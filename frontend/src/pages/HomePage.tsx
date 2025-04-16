import SEO from "@/components/SEO";
import Heading from "@/components/Heading";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";

function HomePage() {
  const strings = useStrings();

  if (strings === null) {
    return null;
  }

  return (
    <>
      <SEO title={strings["HOME"]} />

      <div>
        <Heading>{strings["HOME"]}</Heading>

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
