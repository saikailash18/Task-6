class ContactManager {
    constructor() {
        this.data = this.getData() || [];
    }
    getData() {
        const item = localStorage.getItem("data");
        return item ? JSON.parse(item) : [];
    }
    saveData(data) {
        localStorage.setItem("data", JSON.stringify(data));
    }
    addContact(contact) {
        contact.id = Math.floor(Math.random() * 100);
        this.data.push(contact);
        this.saveData(this.data);
    }
    updateContact(updatedContact) {
        this.data = this.data.map((contact) => contact.id === updatedContact.id ? updatedContact : contact);
        this.saveData(this.data);
    }
    deleteContact(id) {
        this.data = this.data.filter((contact) => contact.id != id);
        this.saveData(this.data);
        return true;
    }
    getAllContacts() {
        return this.data;
    }
    getContactById(id) {
        return this.data.find((contact) => contact.id == id);
    }
}
