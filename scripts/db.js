const dbName = 'SannomiyaDevEventProposal';
const storeName = 'votes';
export let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };
    request.onerror = (event) => {
      console.error('failed to open db', event.target.error);
      reject(event.target.error);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore( storeName, { keyPath: 'id' });
      store.createIndex('id', 'id', { unique: true });
    };
  });
}
