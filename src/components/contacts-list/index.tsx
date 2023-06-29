import ContactsStore from "../../store/contacts-store";
import { useEffect } from "react";
import { Center, Grid, Loader, Stack, Title } from "@mantine/core";
import { ContactCard } from "../contact-card";
import ContactsSearchStore from "../../store/contacts-search-store";
import { observer } from "mobx-react-lite";
import { AddContact } from "../add-contact";

export const ContactsList = observer(() => {
  const { contacts, isLoading, fetchContacts } = ContactsStore;
  const { searchValue } = ContactsSearchStore;

  useEffect(() => {
    fetchContacts(searchValue);
  }, [searchValue]);

  return (
    <div>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : contacts.length > 0 ? (
        <Grid mt="xl">
          {contacts.map((contact) => (
            <Grid.Col key={contact.id} span={4}>
              <ContactCard contact={contact} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Stack align={"center"}>
          <Title order={3} align={"center"}>
            Список ваших контактов пуст!
          </Title>
          <AddContact />
        </Stack>
      )}
    </div>
  );
});
