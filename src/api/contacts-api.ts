import { $http } from "./instance";
import { ContactScheme } from "../types/contact";

export const ContactsApi = {
  getContacts: (userId: number, searchValue?: string) =>
    $http.get(`/api/v1/users/${userId}/contacts`, {
      params: {
        ...(searchValue && { name: searchValue.trim() }),
      },
    }),

  createContact: (contact: Omit<ContactScheme, "id">, userId: number) =>
    $http.post(`/api/v1/users/${userId}/contacts`, contact),

  deleteContact: (contactId: number, userId: number) =>
    $http.delete(`/api/v1/users/${userId}/contacts/${contactId}`),

  editContact: (contact: ContactScheme) =>
    $http.put(
      `/api/v1/users/${contact.userId}/contacts/${contact.id}`,
      contact
    ),
};
