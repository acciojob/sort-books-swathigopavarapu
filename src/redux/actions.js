export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SORT_BOOKS = "SORT_BOOKS";

// Fetch books action (using redux-thunk)
export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });

  try {
  const response = await fetch(
    'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HZmwdTmrvd11gm94r2WM2AA660Hqpzt9'
  );
  const data = await response.json();

  const books = data?.results?.books || [
    {
      title: "Mock Book 1",
      author: "Author 1",
      publisher: "Publisher 1",
      primary_isbn13: "0000000000001",
    },
    {
      title: "Mock Book 2",
      author: "Author 2",
      publisher: "Publisher 2",
      primary_isbn13: "0000000000002",
    },
  ];

  dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
} catch (error) {
  dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
}

};


// Sort books
export const sortBooks = (criteria, order) => ({
  type: SORT_BOOKS,
  payload: { criteria, order },
});
