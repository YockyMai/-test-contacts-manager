import { $authHttp, $http } from "./instance";

export const AuthApi = {
  login: (username: string, password: string) =>
    $http.post("/api/user/login", {
      username,
      password,
    }),
  signup: (username: string, password: string) =>
    $http.post("/api/user/registration", {
      username,
      password,
    }),
  check: () => $authHttp.get(`/api/user/check`),
};
