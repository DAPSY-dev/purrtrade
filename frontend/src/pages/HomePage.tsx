import Button from "../components/Button";

function HomePage() {
  return (
    <div>
      <h1>Home page</h1>

      <div className="pt-4">
        <Button as="router-link" to="/x">
          Go to /x
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
