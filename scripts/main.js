import { openDB } from "./db.js";

window.addEventListener('DOMContentLoaded', async () => {
  // connect to DB
  await openDB();

  // issue client id
  if(localStorage.getItem('clientId') === null) {
    const clientId = crypto.randomUUID();
    localStorage.setItem('clientId', clientId);
  }
});
