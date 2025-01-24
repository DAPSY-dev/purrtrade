function NotFoundPage() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-gray-700">404</h1>
        <p className="mt-4 text-2xl text-gray-700">Oops! Page not found.</p>
        <p className="mt-2 text-lg text-gray-500">
          The page you are looking for might have been moved or deleted.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-gray-700 text-white"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
