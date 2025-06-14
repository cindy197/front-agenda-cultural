import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CadEvent } from "./pages/CadEvent";
import { SignIn } from "./pages/SingIn";
import { SignUp } from "./pages/SingUp";
import { Event } from "./pages/Event";
import { MyEvents } from "./pages/Myevents";
import { Aprove } from "./pages/Aprove";
import type { ReactNode } from "react";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function getUserProfile() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.perfil || payload.role || null;
  } catch {
    return null;
  }
}

function PrivateRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) return <>{children}</>;
  const perfil = getUserProfile();
  if (perfil === "ADMIN") return <Navigate to="/aprove" replace />;
  return <Navigate to="/my-events" replace />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/event"
          element={
            <PublicRoute>
              <Event />
            </PublicRoute>
          }
        />
        <Route
          path="/cad-event"
          element={
            <PrivateRoute>
              <CadEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/aprove"
          element={
            <PrivateRoute>
              <Aprove />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Event />} />
        <Route
          path="*"
          element={
            <Navigate
              to={
                isAuthenticated()
                  ? getUserProfile() === "ADMIN"
                    ? "/aprove"
                    : "/my-events"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
