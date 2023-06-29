import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button, Modal, SimpleGrid, Title } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { ContactScheme } from "../../types/contact";
import ContactsStore from "../../store/contacts-store";
import { useState } from "react";

type Props = {
  contact: ContactScheme;
};

export const RemoveContact = ({ contact }: Props) => {
  const [modalIsOpen, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deleteContact } = ContactsStore;

  const removeContact = () => {
    setIsLoading(true);
    deleteContact(contact.id)
      .then(() => {
        close();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ActionIcon onClick={open} color="red">
        <Trash />
      </ActionIcon>

      <Modal
        title={"Подтвердите действие"}
        opened={modalIsOpen}
        onClose={close}
      >
        <Title order={3} align={"center"} mb={"xl"}>
          Вы уверены что хотите удалить этот контакт?
        </Title>

        <SimpleGrid cols={2}>
          <Button onClick={close} color={"red"}>
            Нет
          </Button>
          <Button loading={isLoading} onClick={removeContact}>
            Да
          </Button>
        </SimpleGrid>
      </Modal>
    </>
  );
};
