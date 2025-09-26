import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, sortBooks } from '../redux/actions';
import './../styles/App.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state);
  const [criteria, setCriteria] = useState('title');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortChange = () => {
    dispatch(sortBooks(criteria, order));
  };

  return (
    <div className="books-container">
      {/* Header for Cypress */}
      <h1>Books List</h1>

      {/* Sorting options with labels for Cypress */}
      <div className="sort-options">
  <div>
    <label htmlFor="sort-criteria">Sort by:</label>
    <select
      id="sort-criteria"
      value={criteria}
      onChange={e => setCriteria(e.target.value)}
    >
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="publisher">Publisher</option>
    </select>
  </div>

  <div>
    <label htmlFor="sort-order">Order:</label>
    <select
      id="sort-order"
      value={order}
      onChange={e => setOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>

  <button onClick={handleSortChange}>Sort</button>
</div>


      {/* Loading and error messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Book table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.primary_isbn13}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
