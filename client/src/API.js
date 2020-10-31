// const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://travel-log-api.now.sh';

export async function listLogEntriesNew(token) {
  const data = await fetch(`/api/logEntry`, {
      method: "GET",
      headers: {
        Authorization: token
      },
    });
    return data.json();
}

export async function createLogEntryNew(entry, token) {
  const response = await fetch(`/api/logEntry`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(entry),
  });
}

export async function deleteLogEntry(logID, token) {
  const response = await fetch(`/api/logEntry`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      logID
    })
  });
  return response.json();
}