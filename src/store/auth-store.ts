import { makeAutoObservable, runInAction } from "mobx";
import { AuthApi } from "../api/auth-api";
import { showNotification } from "@mantine/notifications";
import UserStore from "./user-store";
import { UserScheme } from "../types/user";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios";
import { getApiErrorsText } from "../utils/get-api-errors-messages";

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  logout = () => {
    localStorage.removeItem("token");
    this.isAuth = false;
    UserStore.setUser({} as UserScheme);
  };

  checkAuth = async () => {
    try {
      const { data } = await AuthApi.check();
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

      const decodedToken = jwtDecode<UserScheme>(data.token);

      console.log(data);

      localStorage.setItem("token", data.token);

      runInAction(() => {
        UserStore.setUser(decodedToken);
        this.isAuth = true;
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          color: "red",
          title: "Ошибка валидации",
          message: getApiErrorsText(e.response!.data.message.errors),
        });
      } else {
        showNotification({
          color: "red",
          title: "Ошибка сервера",
          message: "Попробуйте позже",
        });
      }
    }
  };

  signupUser = async (username: string, password: string) => {
    try {
      const { data } = await AuthApi.signup(username, password);
      const decodedToken = jwtDecode<UserScheme>(data.token);
      localStorage.setItem("token", data.token);
      runInAction(() => {
        this.isAuth = true;
        UserStore.setUser(decodedToken);
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          color: "red",
          title: "Ошибка валидации",
          message: getApiErrorsText(e.response!.data.message.errors),
        });
      } else {
        showNotification({
          color: "red",
          title: "Ошибка сервера",
          message: "Попробуйте позже",
        });
      }
    }
  };
}

export default new AuthStore();
