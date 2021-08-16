import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import BooksList from "../books-list";
import BookDetails from "../book-details";
import ErrorIndicator from "../error-indicator";
import UndiscoveredPage from "../undiscovered-page";

import Header from "../header";
import SearchInputsForm from "../search-inputs";

import "./app.css";


function App({ error }) {
  return (
    <>
      <Header />
      <SearchInputsForm />
      {error ? (
        <ErrorIndicator />
      ) : (
        <Switch>
          <Route exact path="/" component={BooksList} />
          <Route
            path="/book/:id"
            render={({
              match: {
                params: { id },
              },
            }) => {
              return <BookDetails bookId={id} />;
            }}
          />
          <Route component={UndiscoveredPage} />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = ({ error }) => {
  return {
    error,
  };
};

export default connect(mapStateToProps)(App);
