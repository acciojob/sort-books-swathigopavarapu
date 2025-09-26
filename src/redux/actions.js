// actions.js
export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SORT_BOOKS = "SORT_BOOKS";

const MOCK_BOOKS = [
  { title: "Mock Book 1", author: "Author 1", publisher: "Publisher 1", primary_isbn13: "0001" },
  { title: "Mock Book 2", author: "Author 2", publisher: "Publisher 2", primary_isbn13: "0002" },
  { title: "Mock Book 3", author: "Author 3", publisher: "Publisher 3", primary_isbn13: "0003" },
];

// Fetch books action (redux-thunk)
export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });

  try {
    const response = await fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HZmwdTmrvd11gm94r2WM2AA660Hqpzt9'
    );
    const data = await response.json();

    // Use API data or fallback to mock
    const books = data?.results?.books?.map(b => ({
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      primary_isbn13: b.primary_isbn13,
    })) || MOCK_BOOKS;

    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
  } catch (error) {
    // If API fails, send mock books
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: MOCK_BOOKS });
  }
};

// Sort books action
export const sortBooks = (criteria, order) => ({
  type: SORT_BOOKS,
  payload: { criteria, order },
});
