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
      <h2>Book List</h2>

      <div className="sort-options">
        <select value={criteria} onChange={e => setCriteria(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={handleSortChange}>Sort</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

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
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
