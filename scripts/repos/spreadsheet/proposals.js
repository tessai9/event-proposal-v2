import { WEB_APP_URL } from "../../constants.js";

const params = new URLSearchParams({ sheet: 'proposals' });

export async function getProposals() {
  try {
    const response = await fetch(`${WEB_APP_URL}?${params.toString()}`);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    const resBody = await response.json();
    const data = resBody.data;
    return data;
  } catch(error) {
    console.error('Failed to fetch proposals:', error);
  }
}

export async function createProposal(proposal) {
  try {
    const response = await fetch(`${WEB_APP_URL}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proposal),
    });
    console.log(response);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch(error) {
    console.error('Failed to create proposal:', error);
  }
}
