class Contact {
  id: number;
  text: string;
  date: string;
  description: string;
  landline: string;
  website: string;
  address: string;
  constructor({
    id,
    text,
    date,
    description,
    landline,
    website,
    address,
  }: {
    id: number;
    text: string;
    date: string;
    description: string;
    landline: string;
    website: string;
    address: string;
  }) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.description = description;
    this.landline = landline;
    this.website = website;
    this.address = address;
  }
}
