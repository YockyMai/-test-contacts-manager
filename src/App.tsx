import { AppRouter } from "./pages";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import AuthStore from "./store/auth-store";
import { observer } from "mobx-react-lite";

function App() {
  const { checkAuth, isAuth } = AuthStore;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && !isAuth) {
      checkAuth(userId);
    }
  });

  return (
    <>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications />
          <AppRouter />
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
