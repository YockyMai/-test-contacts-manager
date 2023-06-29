import { makeAutoObservable, runInAction } from "mobx";
import { AuthApi } from "../api/auth-api";
import { showNotification } from "@mantine/notifications";
import UserStore from "./user-store";
import { UserScheme } from "../types/user";

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  logout = () => {
    localStorage.removeItem("userId");
    this.isAuth = false;
    UserStore.setUser({} as UserScheme);
  };

  checkAuth = async (userId: string) => {
    try {
      const { data } = await AuthApi.check(userId);
      runInAction(() => {
        this.isAuth = true;
        UserStore.setUser(data);
      });
    } catch (e) {
      this.logout();
    }
  };

  loginUser = async (username: string, password: string) => {
    try {
      const { data } = await AuthApi.login(username, password);

      localStorage.setItem("userId", data[0].id.toString());

      runInAction(() => {
        UserStore.setUser(data[0]);
        this.isAuth = true;
      });
    } catch (e) {
      console.log(e);
      showNotification({
        color: "red",
        title: "Ошибка входа",
        message: "Попробуйте позже",
      });
    }
  };

  signupUser = async (username: string, password: string) => {
    try {
      const { data } = await AuthApi.signup(username, password);
      localStorage.setItem("userId", data[0].id.toString());
      runInAction(() => {
        this.isAuth = true;
        UserStore.setUser(data[0]);
      });
    } catch (e) {
      showNotification({
        color: "red",
        title: "Ошибка входа",
        message: "Попробуйте позже",
      });
    }
  };
}

export default new AuthStore();
