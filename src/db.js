import Dexie from 'dexie';

// 1. Initialize the local IndexedDB database inside the phone browser
export const db = new Dexie('BasementInventoryDB');

// 2. Define the schema columns for iCanteen
// '++id' is an auto-incrementing primary key number for each item.
// The other fields are the text keys we use to query and filter later.
db.version(1).stores({
  items: '++id, name, location, description, isSynced, createdAt'
});
