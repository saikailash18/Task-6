class ContactManager<T extends Contact> {
  data: T[];
  constructor() {
    this.data = this.getData() || [];
  }

  getData(): T[] {
    const item = localStorage.getItem("data");
    return item ? JSON.parse(item) : [];
  }

  saveData(data: T[]) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  addContact(contact: T) {
    contact.id = Math.floor(Math.random() * 100);
    this.data.push(contact);
    this.saveData(this.data);
  }

  updateContact(updatedContact: T) {
    this.data = this.data.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.saveData(this.data);
  }
  deleteContact(id: T["id"]) {
    this.data = this.data.filter((contact) => contact.id != id);
    this.saveData(this.data);
    return true;
  }

  getAllContacts(): T[] {
    return this.data;
  }

  getContactById(id: number): T | undefined {
    return this.data.find((contact) => contact.id == id);
  }
}
