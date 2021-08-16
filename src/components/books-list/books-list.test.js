import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducers";
import BooksList from "./books-list";

const renderWithRedux = (component, { store = createStore(reducer) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("BooksList", () => {
  it("BooksList render", () => {
    renderWithRedux(<BooksList />);
  });
});
