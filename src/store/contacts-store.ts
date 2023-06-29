import { ContactScheme } from "../types/contact";
import { makeAutoObservable } from "mobx";
import { showNotification } from "@mantine/notifications";
import { ContactsApi } from "../api/contacts-api";
import UserStore from "./user-store";

class ContactsStore {
  contacts: ContactScheme[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchContacts = async (searchValue: string) => {
    try {
      const userId = UserStore.user.id;

      this.isLoading = true;

      const { data } = await ContactsApi.getContacts(userId, searchValue);

      this.contacts = data;
    } catch (e) {
      showNotification({
        color: "red",
        title: "Ошибка при загрузке списка контактов",
        message: "Попробуйте позже",
      });
    } finally {
      this.isLoading = false;
    }
  };

  createContact = async (contact: { name: string; phone: string }) => {
    try {
      const userId = UserStore.user.id;
      const { data } = await ContactsApi.createContact(
        { userId: userId, name: contact.name, phone: contact.phone },
        userId
      );
      this.contacts.push(data);
    } catch (e) {
      showNotification({
        color: "red",
        title: "Ошибка при создании контакта",
        message: "Попробуйте позже",
      });
    }
  };

  deleteContact = async (contactId: number) => {
    try {
      const userId = UserStore.user.id;
      const { data } = await ContactsApi.deleteContact(contactId, userId);
      this.contacts = this.contacts.filter((el) => el.id !== data.id);
    } catch (e) {
      showNotification({
        color: "red",
        title: "Ошибка при удалении контакта",
        message: "Попробуйте позже",
      });
    }
  };

  editContact = async (contact: ContactScheme) => {
    try {
      const { data } = await ContactsApi.editContact(contact);

      const index = this.contacts.findIndex(({ id }) => id === data.id);
      if (index !== -1) {
        this.contacts[index] = data;
      }
    } catch (e) {
      showNotification({
        color: "red",
        title: "Ошибка при редактировании контакта",
        message: "Попробуйте позже",
      });
    }
  };
}

export default new ContactsStore();
