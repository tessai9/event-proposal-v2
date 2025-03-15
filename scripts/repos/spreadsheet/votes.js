import { WEB_APP_URL } from "../../constants.js";

const buildParams = (action) => new URLSearchParams({ sheet: 'votes', action });

export async function createVote(proposalId) {
  const clientId = localStorage.getItem('clientId');
  if(!clientId) return;

  try {
    const params = buildParams('create');
    await fetch(`${WEB_APP_URL}?${params.toString()}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ proposalId, clientId }),
    });

    return true;
  } catch(error) {
    console.error('Failed to create vote:', error);
    return false;
  }
}

export async function deleteVote(proposalId) {
  const clientId = localStorage.getItem('clientId');
  if(!clientId) return;

  try {
    const params = buildParams('cancel');
    await fetch(`${WEB_APP_URL}?${params.toString()}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ proposalId, clientId }),
    });

    return true;
  } catch(error) {
    console.error('Failed to cancel vote:', error);
    return false;
  }
}
