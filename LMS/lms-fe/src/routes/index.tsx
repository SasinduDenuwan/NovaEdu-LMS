import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"

const LoadingPage = lazy(() => import("../components/LoadingPage"))
const AccessDenied = lazy(() => import("../components/AccessDenid"))
const LoginPage = lazy(() => import("../pages/Login"))
const SignupPage = lazy(() => import("../pages/Signup"))
const ResetPWPage = lazy(() => import("../pages/ResetPW"))
const Index = lazy(() => import("../pages/Index"))  
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
  return (
    <BrowserRouter>
      <Suspense
        fallback= {<LoadingPage />}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-pw" element={<ResetPWPage />} /> 
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
