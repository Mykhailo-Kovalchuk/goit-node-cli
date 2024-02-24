import fs from "fs/promises"; // імпорт fs 
import { nanoid } from "nanoid";
import path from "path"; // імпорт шляхів  path
// const path = require('path'); // або створюємо через змінну

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

// const contactsPath = path.join("db", "contacts.json");  // цей метод (path.join()) отримує частинку шляху і об`єднує їх в 1 шлях.
const contactsPath = path.resolve("db", "contacts.json"); // так само як join, але на початок він підставляє абсолютний шлях ло кореня проєкту.
// console.log(contactsPath)

const  refreshedContacts = (contactsList) => fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2)); // прописуємо функцію оновлення нашого масиву контактів

///////////////////////////////////      1  отримання всіх       /////////////////////////////////////////////////////////////////
 async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
      const data = await fs.readFile(contactsPath, "utf-8") // utf-8 - прописуємо це кодування, щоб нам одразу повернувся рядок замість буферу (наче як не обов`язково, але нехай буде).
      return JSON.parse(data);
    } catch (error) {
      // console.log(error.message);
      throw error;
    }
  }
  ////////////////////////////////          2 отримання одного    ////////////////////////////////////////////////////////////////
  async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const result =  contacts.find(item  => item.id === contactId);
    return result || null;
  }
  ////////////////////////////////      3 видалення одного і його повернення    //////////////////////////////////////////////////
  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
// видаляємо через індекс а не через фільтр, тому що нам потрібно буде повернути видалений об`єкт
const index = contacts.findIndex(item => item.id === contactId); // поверне -1 якщо не знайде
if (index === -1) {
return null;
}
const [result] = contacts.splice(index, 1); // тут взагалі прикол, це деструктуризація масиву.
await refreshedContacts(contacts); // викликаємо функцію для оновлення масиву контаків.
    return result;
  }
  
  ////////////////////////////////     4  додавання одного      /////////////////////////////////////////////////////////////////
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const newContact = {id: nanoid(), name, email, phone};
  contacts.push(newContact);

  await refreshedContacts(contacts); // викликаємо функцію для оновлення масиву контаків.
return newContact;
  }

  export { listContacts, getContactById, removeContact, addContact };