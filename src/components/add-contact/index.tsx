import {
  Button,
  Modal,
  Stack,
  TextInput,
  Text,
  Input,
  SimpleGrid,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import ContactsStore from "../../store/contacts-store";
import InputMask from "react-input-mask";
import { useState } from "react";
import { getAddContactScheme } from "../../utils/get-add-contact-scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { showNotification } from "@mantine/notifications";

type Fields = {
  phone: string;
  name: string;
};

export const AddContact = observer(() => {
  const [modalIsOpen, { open, close }] = useDisclosure(false);
  const { createContact } = ContactsStore;
  const [isLoading, setIsLoading] = useState(false);

  const validationScheme = getAddContactScheme();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Fields>({
    resolver: yupResolver(validationScheme),
  });

  const closeModal = () => {
    reset();
    close();
  };

  const onSubmit: SubmitHandler<Fields> = (data) => {
    setIsLoading(true);
    createContact(data)
      .then(() => {
        closeModal();
        showNotification({
          message: "Контакт успешно добавлен",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button onClick={open}>Добавить контакт</Button>
      <Modal
        title={"Добавьте контакт!"}
        opened={modalIsOpen}
        onClose={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              placeholder={"Введите имя контакта"}
              label={"Название контакта"}
              {...register("name")}
            />
            {errors.name?.message && (
              <Text size={"sm"} color={"red"}>
                {errors.name.message}
              </Text>
            )}
            <Input.Wrapper label={"Телефон"}>
              <Input
                {...register("phone")}
                component={InputMask}
                mask={"+7 (999) 999 99-99"}
                placeholder={"Введите номер телефона"}
              />
            </Input.Wrapper>
            {errors.phone?.message && (
              <Text size={"sm"} color={"red"}>
                {errors.phone.message}
              </Text>
            )}
            <SimpleGrid cols={2}>
              <Button color={"red"} onClick={closeModal}>
                Отмена
              </Button>
              <Button loading={isLoading} type={"submit"}>
                Добавить контакт
              </Button>
            </SimpleGrid>
          </Stack>
        </form>
      </Modal>
    </>
  );
});
