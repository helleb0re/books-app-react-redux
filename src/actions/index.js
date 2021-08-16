const booksNewRequested = () => {
  return {
    type: "FETCH_NEW_BOOKS_REQUESTED",
  };
};

const booksMoreRequested = () => {
  return {
    type: "FETCH_MORE_BOOKS_REQUESTED",
  };
};

const booksNewLoaded = (values, totalValues, requestParameters) => {
  return {
    type: "FETCH_NEW_BOOKS_SUCCESS",
    payload: { values, totalValues, requestParameters },
  };
};

const booksMoreLoaded = (values, totalValues) => {
  return {
    type: "FETCH_MORE_BOOKS_SUCCESS",
    payload: { values, totalValues },
  };
};

const booksError = (error) => {
  return {
    type: "FETCH_BOOKS_FAILURE",
    payload: error,
  };
};

const fetchNewBooksByQuery =
  (dispatch, booksService) => (requestParameters) => {
    dispatch(booksNewRequested());
    booksService
      .getBooksByQuery(
        requestParameters.query,
        requestParameters.sortBy,
        requestParameters.category
      )
      .then(({ items, totalItems }) =>
        dispatch(booksNewLoaded(items, totalItems, requestParameters))
      )
      .catch((error) => dispatch(booksError(error)));
  };

const fetchMoreBooksByQuery =
  (dispatch, booksService) => (requestParameters, page) => {
    dispatch(booksMoreRequested());
    booksService
      .getBooksByQuery(
        requestParameters.query,
        requestParameters.sortBy,
        requestParameters.category,
        page
      )
      .then(({ items, totalItems }) =>
        dispatch(booksMoreLoaded(items, totalItems))
      )
      .catch((error) => dispatch(booksError(error)));
  };

export { fetchNewBooksByQuery, fetchMoreBooksByQuery };
