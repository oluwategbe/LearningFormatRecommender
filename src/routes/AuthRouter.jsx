import { lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import { PrivatePaths } from "./path";

const paths = [
  {
    path: "",
    element: lazy(() => import("../modules/Auth/Login")),
  },
  {
    path: "login",
    element: lazy(() => import("../modules/Auth/Login")),
  },

  {
    path: "register",
    element: lazy(() => import("../modules/Auth/Register")),
  },
  {
    path: "forgot-password",
    element: lazy(() => import("../modules/Auth/ForgotPassword")),
  },
  {
    path: "reset-password/:id",
    element: lazy(() => import("../modules/Auth/ResetPassword")),
  },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Auth() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to={`${PrivatePaths.DASHBOARD}`} replace />;
  }

  return (
    <Routes>
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  );
}

export default Auth;
