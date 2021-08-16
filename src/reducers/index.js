const initialState = {
  firstLoading: true,
  lastRequestParameters: {},
  totalResults: 0,
  page: 0,
  books: new Map(),
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MORE_BOOKS_REQUESTED":
      return {
        ...state,
        firstLoading: false,
        loading: true,
        error: null,
      };
    case "FETCH_NEW_BOOKS_REQUESTED":
      return {
        ...state,
        page: 0,
        firstLoading: false,
        loading: true,
        error: null,
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        firstLoading: false,
        loading: false,
        error: action.payload,
      };
    case "FETCH_NEW_BOOKS_SUCCESS":
      const {
        values: booksData,
        totalValues: totalResults,
        requestParameters,
      } = action.payload;

      const booksDataMap = booksData.map((item) => [item.id, item]);

      return {
        ...state,
        lastRequestParameters: requestParameters,
        totalResults,
        page: 1,
        books: new Map(booksDataMap),
        // books: [...booksData],
        firstLoading: false,
        loading: false,
        error: null,
      };

    case "FETCH_MORE_BOOKS_SUCCESS":
      const { values: moreBooksData, totalValues: newTotalResults } =
        action.payload;

      const moreBooksDataMap = moreBooksData.map((item) => [item.id, item]);

      return {
        ...state,
        page: state.page + 1,
        totalResults: newTotalResults,
        books: new Map([...state.books, ...moreBooksDataMap]),
        // books: [...state.books, ...moreBooksData],
        firstLoading: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
