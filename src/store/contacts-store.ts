import { ContactScheme } from "../types/contact";
import { makeAutoObservable } from "mobx";
import { showNotification } from "@mantine/notifications";
import { ContactsApi } from "../api/contacts-api";
import { phoneToNumber } from "../utils/phone-to-number";
import { AxiosError } from "axios";
import { getApiErrorsText } from "../utils/get-api-errors-messages";

class ContactsStore {
  contacts: ContactScheme[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchContacts = async (searchValue: string) => {
    try {
      this.isLoading = true;

      const { data } = await ContactsApi.getContacts(searchValue);

      this.contacts = data.contacts;
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
      const { data } = await ContactsApi.createContact({
        name: contact.name,
        phone: phoneToNumber(contact.phone),
      });
      this.contacts.push(data.contact);

      showNotification({
        message: "Контакт успешно добавлен",
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          color: "red",
          title: "Ошибка валидации",
          message: getApiErrorsText(e.response!.data.message.errors),
        });
      } else {
        showNotification({
          color: "red",
          title: "Ошибка сервера",
          message: "Попробуйте позже",
        });
      }
    }
  };

  deleteContact = async (contactId: number) => {
    try {
      await ContactsApi.deleteContact(contactId);
      this.contacts = this.contacts.filter((el) => el.id !== contactId);
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

      const index = this.contacts.findIndex(({ id }) => id === data.contact.id);
      if (index !== -1) {
        this.contacts[index] = data.contact;
      }
      showNotification({
        message: "Контакт успешно изменен",
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          color: "red",
          title: "Ошибка валидации",
          message: getApiErrorsText(e.response!.data.message.errors),
        });
      } else {
        showNotification({
          color: "red",
          title: "Ошибка сервера",
          message: "Попробуйте позже",
        });
      }
    }
  };
}

export default new ContactsStore();
