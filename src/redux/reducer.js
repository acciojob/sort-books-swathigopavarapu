import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SORT_BOOKS,
} from './actions';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SORT_BOOKS:
      const { criteria, order } = action.payload;
      const sortedBooks = [...state.books].sort((a, b) => {
        const fieldA = a[criteria]?.toLowerCase() || '';
        const fieldB = b[criteria]?.toLowerCase() || '';
        if (fieldA < fieldB) return order === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return order === 'asc' ? 1 : -1;
        return 0;
      });
      return { ...state, books: sortedBooks };
    default:
      return state;
  }
};

export default reducer;
