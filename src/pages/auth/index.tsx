import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Stack,
  TextInput,
  Text,
  PasswordInput,
  Group,
  Button,
  Mark,
} from "@mantine/core";
import { getValidationSchema } from "../../utils/get-auth-scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthStore from "../../store/auth-store";
import { observer } from "mobx-react-lite";

type Inputs = { username: string; password: string };

export const Auth = observer(() => {
  const { pathname } = useLocation();
  const { loginUser, signupUser } = AuthStore;

  const isLoginPage = pathname === "/auth/login";

  const validationScheme = getValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationScheme),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoginPage) {
      loginUser(data.username, data.password);
    } else {
      signupUser(data.username, data.password);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {isLoginPage && (
            <Text>
              <Mark>Пароль и имя для входа: TestUser</Mark>
            </Text>
          )}
          <TextInput
            label={"Имя пользователя"}
            placeholder={"Введите имя пользователя"}
            {...register("username")}
          />
          {errors.username?.message && (
            <Text size={"sm"} color={"red"}>
              {errors.username.message}
            </Text>
          )}
          <PasswordInput
            label={"Пароль"}
            placeholder={"Введите пароль"}
            {...register("password")}
          />
          {errors.password?.message && (
            <Text size={"sm"} color={"red"}>
              {errors.password.message}
            </Text>
          )}
          <Group position="right" mt="md">
            <Button type={"submit"}>
              {isLoginPage ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
});
