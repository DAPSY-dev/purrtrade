import { useSelector } from "react-redux";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Copyright from "@/components/Copyright";
import { RootState } from "@/store/reducers";

function NotFoundPage() {
  const {
    strings,
    loading: stringsLoading,
    error: stringsError,
  } = useSelector((state: RootState) => state.strings);

  if (stringsLoading) {
    return null;
  }

  if (stringsError) {
    console.error(stringsError);
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start gap-2 py-12 px-4 min-h-dvh bg-gray-100 text-center">
      <Logo className="mb-12" />

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

      <Copyright className="mt-12" />
    </div>
  );
}

export default NotFoundPage;
