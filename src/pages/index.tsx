import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./auth";
import { observer } from "mobx-react-lite";
import AuthStore from "../store/auth-store";
import { AuthLayout } from "../layouts/auth-layout";
import { MainLayout } from "../layouts/main-layout";
import { Contacts } from "./contacts";

export const AppRouter = observer(() => {
  const { isAuth } = AuthStore;
  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route element={<AuthLayout />} path={"/auth"}>
            <Route path={"signup"} element={<Auth />} />
            <Route path={"login"} element={<Auth />} />
          </Route>
          <Route path="*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<Contacts />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
});
