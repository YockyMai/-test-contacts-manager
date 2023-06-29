import { Button, Container, Divider, Group, Text } from "@mantine/core";
import { headerStyles } from "./styles";
import { Link } from "react-router-dom";
import { Phone } from "tabler-icons-react";
import UserStore from "../../store/user-store";
import AuthStore from "../../store/auth-store";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const { user } = UserStore;
  const { logout } = AuthStore;

  const { classes } = headerStyles();

  return (
    <div>
      <Container className={classes.header}>
        <Button component={Link} to={"/"} variant="subtle">
          <Group noWrap>
            <Phone size={30} />
            <Text>Контакты</Text>
          </Group>
        </Button>
        <Group noWrap>
          <Text color={"dimmed"} size={14}>
            {user.username}
          </Text>
          <Button onClick={logout}>Выход</Button>
        </Group>
      </Container>
      <Divider mb={"xl"} />
    </div>
  );
});
