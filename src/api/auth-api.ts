import { $http } from "./instance";

export const AuthApi = {
  login: (username: string, password: string) =>
    $http.get(`/api/v1/users?username=${username}&password=${password}`),
  signup: (username: string, password: string) =>
    $http.get("/api/v1/users", {
      data: {
        username,
        password,
      },
    }),
  check: (userId: string) => $http.get(`/api/v1/users/${userId}`),
};
