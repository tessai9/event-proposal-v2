import { db } from "../db.js";

export async function toggleVote(proposalId) {
  const voted = await isVoted(proposalId);
  if(voted) {
    await cancelVote(proposalId);
  } else {
    await vote(proposalId);
  }
};

async function isVoted(proposalId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['votes'], 'readonly');
    const store = transaction.objectStore('votes');
    const request = store.get(proposalId);
    request.onsuccess = (event) => {
      const vote = event.target.result;
      resolve(!!vote);
    };
    request.onerror = (event) => {
      console.error('failed to get vote', event.target.error);
      reject(event.target.error);
    };
  });
};

async function vote(proposalId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['votes'], 'readwrite');
    const store = transaction.objectStore('votes');
    const request = store.add({ id: proposalId });
    request.onsuccess = () => {
      resolve(true);
    };
    request.onerror = (event) => {
      console.error('failed to vote', event.target.error);
      reject(event.target.error);
    };
  });
};

async function cancelVote(proposalId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['votes'], 'readwrite');
    const store = transaction.objectStore('votes');
    const request = store.delete(proposalId);
    request.onsuccess = () => {
      resolve(true);
    };
    request.onerror = (event) => {
      console.error('failed to cancel vote', event.target.error);
      reject(event.target.error);
    };
  });
};
