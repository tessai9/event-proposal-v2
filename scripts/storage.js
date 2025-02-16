const dbName = 'SannomiyaDevEventProposal';
const storeName = 'votes';
let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };
    request.onerror = (event) => {
      console.error('failed to open db', event.target.error);
      reject(event.target.error);
    };
  });
}
