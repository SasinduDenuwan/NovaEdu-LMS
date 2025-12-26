import { lazy, Suspense, type ReactNode, useState, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Index from "../pages/Index"
import StudentDashboard from "../pages/StudentDashboard"
import AdminDashboard from "../pages/AdminDashboard"
import LoadingPage from "../components/LoadingPage"

const AccessDenied = lazy(() => import("../components/AccessDenid"))
const LoginPage = lazy(() => import("../pages/Login"))
const SignupPage = lazy(() => import("../pages/Signup"))
const ResetPWPage = lazy(() => import("../pages/ResetPW"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))

type RequireAuthTypes = { children: ReactNode; roles?: string[] }

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return <AccessDenied />
  }

  return <>{children}</>
}

export default function Router() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback= {<LoadingPage />}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student" element={
            <RequireAuth>
              <StudentDashboard />
            </RequireAuth>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/" element={<TestCode2 />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-pw" element={<ResetPWPage />} /> 
          <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          } />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route>
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          > */}
            {/* <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route
              path="/my-post"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequireAuth>
              }
            />
          </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
