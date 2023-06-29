import { ContactScheme } from "../../types/contact";
import { Divider, Group, Title, Text, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ContactActions } from "../contact-actions";
import { Copy } from "tabler-icons-react";

type Props = {
  contact: ContactScheme;
};

export const ContactCard = ({ contact }: Props) => {
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(contact.phone.toString()).then(() => {
      showNotification({
        title: "Успешно!",
        message: "Номер добавлен в буфер обмена!",
      });
    });
  };

  return (
    <div
      style={{
        padding: "5px 10px",
        boxShadow: "3px 2px 5px #dde3ed",
        borderRadius: "0.3em",
      }}
    >
      <Group align={"center"} mt={"sm"} noWrap position={"apart"}>
        <Title order={3} color={"dimmed"}>
          {contact.name}
        </Title>
        <ContactActions contact={contact} />
      </Group>
      <Divider my="sm" />
      <Button
        style={{ width: "100%" }}
        my={"sm"}
        onClick={copyPhoneNumber}
        rightIcon={<Copy />}
        color={"teal"}
      >
        <Text>Телефон: {contact.phone}</Text>
      </Button>
    </div>
  );
};
