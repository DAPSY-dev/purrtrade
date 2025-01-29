import Button from "../components/Button";

function HomePage() {
  return (
    <div className="p-4">
      <h1>Home page</h1>

      <div className="mt-4">
        <Button>Button</Button>
      </div>

      <div className="mt-4">
        <Button type="submit">Button</Button>
      </div>

      <div className="mt-4">
        <Button as="button">Button</Button>
      </div>

      <div className="mt-4">
        <Button as="anchor" href="#">
          Button
        </Button>
      </div>

      <div className="mt-4">
        <Button as="router-link" to="/x">
          Go to /x
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
