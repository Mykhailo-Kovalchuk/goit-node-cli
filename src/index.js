console.log("123123123 test test test")

import * as contactsService from './contacts.js'; // імпорт всіх функцій з файлу contacts.

import { program } from "commander"; // імпорт командера
program // налаштування командера (через option), прописуємо команди в опшини нижче
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(); // через парс передаємо наш масив (який потім перетворить його на об`єкт)

const options = program.opts(); // тут парс власне і перетворює наш масив на об`єкт

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const listOfContacts = await contactsService.listContacts() 
      return console.log(listOfContacts);
      // break;
     
    case "get":
      // ... id
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);
      // break;

    case "add":
      // ... name email phone
      const addNewContact = await contactsService.addContact(id, name, email, phone);
      return console.log(newMovie);
      // break;

    case "remove":
      // ... id
      const removeContactById = await contactsService.removeContact(id);
      return console.log(removeContactById);
      // break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
