import { EditContact } from "../edit-contact";
import { RemoveContact } from "../remove-contact";
import { ContactScheme } from "../../types/contact";
import { Group } from "@mantine/core";

type Props = {
  contact: ContactScheme;
};

export const ContactActions = ({ contact }: Props) => {
  return (
    <Group>
      <EditContact contact={contact} />
      <RemoveContact contact={contact} />
    </Group>
  );
};
