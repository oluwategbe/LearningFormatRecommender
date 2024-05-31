import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";
import { AuthContext } from "../context";

const privateRoutes = [
  {
    path: "dashboard",
    element: lazy(() => import("../modules/Home")),
  },
  {
    path: "about",
    element: lazy(() => import("../modules/About")),
  },
];
function User() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={`${PublicPaths.LOGIN}`} replace />;
  }
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default User;
