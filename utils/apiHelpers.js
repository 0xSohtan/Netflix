export function fetchEpisodes() {
  return fetch('/api/list')
    .then(response => {
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Es gab ein Problem mit dem Fetch-Operation:', error);
      throw error;
    });
}

// Du kannst hier weitere API-Hilfsfunktionen hinzufügen, wenn du sie benötigst.
