import React from "react";
import Spinner from "../spinner";
import SmallSpinner from "../small-spinner";
import notAvailableImg from "../../images/not-available.png";
import BooksListItem from "../books-list-item/books-list-item";
import GreetingsPage from "../greetings-page/greetings-page";
import { Container } from "../help-components";

import { compose } from "redux";
import { connect } from "react-redux";
import { fetchMoreBooksByQuery } from "../../actions";
import { withBooksService } from "../hoc";

import "./books-list.css";

function BooksList({
  lastRequestParameters,
  totalResults,
  page,
  books,
  firstLoading,
  loading,
  fetchMoreBooksByQuery,
}) {
  const booksArr = Array.from(books.values());

  const booksListItems = booksArr.map((item) => {
    const { imageLinks, categories, authors, title } = item.volumeInfo;
    return (
      <BooksListItem
        key={item.id}
        id={item.id}
        imageSrc={imageLinks ? imageLinks.thumbnail : notAvailableImg}
        category={categories ? categories[0] : ""}
        authors={authors ? authors : []}
        title={title}
      />
    );
  });

  if (firstLoading) {
    return (
      <section className="books-list">
        <GreetingsPage />
      </section>
    );
  }

  if (loading && !page) {
    return (
      <section className="books-list">
        <Container>
          <Spinner />
        </Container>
      </section>
    );
  }

  const loadMore = () => {
    fetchMoreBooksByQuery(lastRequestParameters, page);
  };

  return (
    <section className="books-list" data-testid={`books-list ${page}`}>
      <Container>
        <h2 className="books-list__total-results">{`Found ${totalResults} ${
          totalResults === 1 ? "result" : "results"
        }`}</h2>
        <div className="books-list__items-wrapper">{booksListItems}</div>
        {loading ? (
          <SmallSpinner />
        ) : booksArr.length >= totalResults ? null : (
          <button className="books-list__load-more" onClick={loadMore}>
            Load more
          </button>
        )}
      </Container>
    </section>
  );
}

const mapStateToProps = ({
  firstLoading,
  lastRequestParameters,
  totalResults,
  page,
  books,
  loading,
}) => {
  return {
    firstLoading,
    lastRequestParameters,
    totalResults,
    page,
    books,
    loading,
  };
};

const mapDispatchToProps = (dispatch, { booksService }) => {
  return {
    fetchMoreBooksByQuery: (parameters, page) => {
      return fetchMoreBooksByQuery(dispatch, booksService)(parameters, page);
    },
  };
};

export default compose(
  withBooksService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BooksList);
