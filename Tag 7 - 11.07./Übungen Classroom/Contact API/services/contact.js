import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";

const contactFileUrl = new URL("../data/contacts.json", import.meta.url);

// Datei einmal lesen
// und dann nur noch schreiben
// denn wir kennen hier im js den
// aktuellen stand schon.
let fileContent;

const init = async () => {
  // Read contacts.json
  const fileContentString = await fs.readFile(contactFileUrl, {
    encoding: "utf-8",
  });
  // parse den file inhalt string zu einem javascript object
  // und speichere den wert in unsere lokalen fileContent variable
  fileContent = JSON.parse(fileContentString);
};

// Setup Contacts file content var
init().catch((err) => {
  console.error("Initialization of contacts service failed with: ", err);
});

const write = async () => {
  // nehme file content und schreibe das
  // in die json Datei
  const fileContentString = JSON.stringify(fileContent, null, 2);
  await fs.writeFile(contactFileUrl, fileContentString, { encoding: "utf-8" });
};

export const add = async (contact) => {
  // give contact a id (uuid = unique identifier)
  contact.id = uuid();
  // push and fileContent
  fileContent.push(contact);
  await write();

  return contact;
};
export const getAll = async () => {
  return fileContent;
};
export const getOneById = async (id) => {
  const contact = fileContent.find((contact) => contact.id === id);
  console.log(contact);
  return contact;
};
export const updateOneById = async (id) => {};
export const deleteOneById = async (id) => {};
