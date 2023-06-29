import { makeAutoObservable } from "mobx";

class ContactsSearchStore {
  searchValue = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = (value: string) => {
    this.searchValue = value;
  };
}

export default new ContactsSearchStore();
