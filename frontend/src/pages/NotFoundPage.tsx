import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen bg-gray-100 text-center">
      <h1 className="font-bold text-6xl text-gray-700">404</h1>
      <p className="text-2xl text-gray-700">Oops! Page not found.</p>
      <p className="text-lg text-gray-500">
        The page you are looking for might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="inline-block mt-4 px-6 py-3 bg-gray-700 text-white"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
