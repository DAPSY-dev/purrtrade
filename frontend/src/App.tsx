import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import { ThunkDispatchType } from "./store/store";
import { fetchStrings } from "./store/actions/strings-actions";

const MainLayout = lazy(() => import("./pages/layout/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const dispatch = useDispatch<ThunkDispatchType>();

  useEffect(() => {
    const abortFetchStrings = dispatch(fetchStrings());

    return () => {
      abortFetchStrings();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader fullPage />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
