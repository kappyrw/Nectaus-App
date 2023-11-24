// api.js
const apiUrl = 'http://localhost:3000/api/news';

const fetchNews = () => {
  // ... (existing code for fetching news)
};

const createNews = ({ title, content }) => {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error creating news:', error);
      throw error;
    });
};

export { fetchNews, createNews };
