import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import { fetchStrings } from "./store/actions/strings-actions";

const MainLayout = lazy(() => import("./pages/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchStrings());
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader fullPage />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            {/* <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route> */}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
