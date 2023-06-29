import {
  ActionIcon,
  Button,
  Input,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Pencil } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ContactScheme } from "../../types/contact";
import { SubmitHandler, useForm } from "react-hook-form";
import ContactsStore from "../../store/contacts-store";
import { useEffect, useState } from "react";
import { getAddContactScheme } from "../../utils/get-add-contact-scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { showNotification } from "@mantine/notifications";
import { observer } from "mobx-react-lite";

type Props = {
  contact: ContactScheme;
};

type Fields = {
  name: string;
  phone: string;
};

export const EditContact = observer(({ contact }: Props) => {
  const [modalIsOpen, { open, close }] = useDisclosure(false);
  const { editContact } = ContactsStore;
  const [isLoading, setIsLoading] = useState(false);

  const validationScheme = getAddContactScheme();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Fields>({
    resolver: yupResolver(validationScheme),
  });

  useEffect(() => {
    setValue("phone", contact.phone);
    setValue("name", contact.name);
  }, []);

  const closeModal = () => {
    close();
  };

  const onSubmit: SubmitHandler<Fields> = (data) => {
    setIsLoading(true);
    editContact({ ...data, userId: contact.userId, id: contact.id })
      .then(() => {
        closeModal();
        showNotification({
          message: "Контакт успешно изменен",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ActionIcon onClick={open}>
        <Pencil />
      </ActionIcon>

      <Modal
        title={"Редактировать контакт"}
        opened={modalIsOpen}
        onClose={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              placeholder={"Введите имя"}
              label={"Имя контакта"}
              {...register("name")}
            />
            {errors.name?.message && (
              <Text color={"red"} size={"sm"}>
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
              <Text color={"red"} size={"sm"}>
                {errors.phone.message}
              </Text>
            )}
            <SimpleGrid cols={2}>
              <Button color={"red"} onClick={closeModal}>
                Отменить изменения
              </Button>
              <Button loading={isLoading} type={"submit"}>
                Редактировать
              </Button>
            </SimpleGrid>
          </Stack>
        </form>
      </Modal>
    </>
  );
});
