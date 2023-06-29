import { Header } from "../../components/header";
import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Container size={"xl"}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};
