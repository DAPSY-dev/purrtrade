import { useSelector } from "react-redux";
import Button from "../components/Button";

function NotFoundPage() {
  const {
    strings,
    loading: stringsLoading,
    error: stringsError,
  } = useSelector((state: any) => state.strings);

  if (stringsLoading) {
    return null;
  }

  if (stringsError) {
    console.error(stringsError);
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen bg-gray-100 text-center">
      <h1 className="font-bold text-6xl text-gray-700">
        {strings["TITLE_404"]}
      </h1>
      <p className="text-2xl text-gray-700">
        {strings["OOPS"]} {strings["PAGE_NOT_FOUND"]}
      </p>
      <p className="text-lg text-gray-500">
        {strings["PAGE_MIGHT_BE_MOVED_OR_DELETED"]}
      </p>
      <Button as="router-link" to="/" className="mt-4">
        {strings["GO_BACK_HOME"]}
      </Button>
    </div>
  );
}

export default NotFoundPage;
