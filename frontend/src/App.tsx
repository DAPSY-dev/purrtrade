import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import Loader from "@/components/Loader";
import { useLanguage } from "@/hooks/useLanguage";
import { ThunkDispatchType } from "@/store/store";
// import { setLanguage } from "@/store/actions/language-actions";
import { fetchStrings } from "@/store/actions/strings-actions";

const MainLayout = lazy(() => import("@/pages/layout/MainLayout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  const lang = useLanguage();
  const dispatch = useDispatch<ThunkDispatchType>();

  useEffect(() => {
    // dispatch(setLanguage("bg"));
    const { abort: abortFetchStrings } = dispatch(fetchStrings(lang));

    return () => {
      abortFetchStrings();
    };
  }, [lang, dispatch]);

  return (
    <>
      <SEO />

      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<Loader fullPage />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
