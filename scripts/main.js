import { openDB } from "./storage.js";

window.addEventListener('DOMContentLoaded', async () => {
  // connect to DB
  await openDB();
});
