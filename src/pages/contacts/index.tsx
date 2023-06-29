import { ContactsList } from "../../components/contacts-list";
import { Group } from "@mantine/core";
import { AddContact } from "../../components/add-contact";
import { SearchContacts } from "../../components/search-contacts";

export const Contacts = () => {
  return (
    <div>
      <Group mb={50} align={"center"} noWrap>
        <AddContact />
        <SearchContacts />
      </Group>
      <ContactsList />
    </div>
  );
};
