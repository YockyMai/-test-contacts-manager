import ContactsSearchStore from "../../store/contacts-search-store";
import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";

export const SearchContacts = () => {
  const { setSearchValue } = ContactsSearchStore;

  const [inputValue, setInputValue] = useState("");

  const [debouncedInputValue, setDebouncedInputValue] = useDebouncedState(
    inputValue,
    300
  );

  useEffect(() => {
    setDebouncedInputValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setSearchValue(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <TextInput
      placeholder={"Поиск по названию контакта"}
      icon={<Search />}
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      style={{ width: "100%" }}
    />
  );
};
