import React from 'react';
import { Provider } from 'react-redux';
import store from "../redux/store"
import BooksList from './BooksList';
import "../styles/App.css";
import 'regenerator-runtime/runtime';


const App = () => (
  <Provider store={store}>
    <div>
      <BooksList />
    </div>
  </Provider>
);

export default App;
