import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, Container, Divider, Group, Text, Title } from "@mantine/core";

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignupPage = pathname === "/auth/signup";
  return (
    <Container size={"xs"} mt="10%">
      <Title align={"center"} order={2}>
        {isSignupPage ? "Регистрация" : "Вход"}
      </Title>
      <Outlet />
      <Divider my={"xl"} />
      <Group>
        {isSignupPage ? (
          <>
            <Text>Уже есть аккаунт?</Text>
            <Button variant={"light"} component={Link} to={"/auth/login"}>
              Войти
            </Button>
          </>
        ) : (
          <>
            <Text>Еще нет аккаунта?</Text>
            <Button variant={"light"} component={Link} to={"/auth/signup"}>
              Зарегистрироватся
            </Button>
          </>
        )}
      </Group>
    </Container>
  );
};
