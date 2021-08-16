import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { BooksServiceProvider } from "./contexts";
import BooksService from "./services/books-service";

import store from "./store";

import "./index.css";

const booksService = new BooksService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BooksServiceProvider value={booksService}>
        <Router>
          <App />
        </Router>
      </BooksServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
