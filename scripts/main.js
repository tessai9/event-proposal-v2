import { openDB } from "./db.js";

window.addEventListener('DOMContentLoaded', async () => {
  // connect to DB
  await openDB();
});
