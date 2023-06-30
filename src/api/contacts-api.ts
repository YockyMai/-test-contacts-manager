import { $authHttp } from "./instance";
import { ContactScheme } from "../types/contact";

export const ContactsApi = {
  getContacts: (searchValue?: string) =>
    $authHttp.get(`/api/contact/`, {
      params: {
        ...(searchValue && { search: searchValue.trim() }),
      },
    }),

  createContact: (contact: { phone: string; name: string }) =>
    $authHttp.post(`/api/contact/create`, contact),

  deleteContact: (contactId: number) =>
    $authHttp.delete(`/api/contact/delete`, {
      params: {
        contactId,
      },
    }),

  editContact: (contact: ContactScheme) =>
    $authHttp.post(`/api/contact/edit`, contact),
};
