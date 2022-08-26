export const fetchBook = (isbn) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  ).then((response) => response.json());
};
