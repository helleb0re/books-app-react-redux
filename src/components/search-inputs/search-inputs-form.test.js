import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducers";
import SearchInputsForm from "./search-inputs-form";

const renderWithRedux = (component, { store = createStore(reducer) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("SearchInputsForm", () => {
  it("search input", () => {
    renderWithRedux(<SearchInputsForm />);
    expect(screen.getByRole("searchbox")).toBeEmptyDOMElement();
    userEvent.type(screen.getByRole("searchbox"), "test");
    expect(screen.getByRole("searchbox")).toHaveValue("test");
  });

  it("select option", () => {
    const { getByText, getAllByRole } = renderWithRedux(<SearchInputsForm />);

    // check first select
    userEvent.selectOptions(getAllByRole("combobox")[0], "history");
    expect(getByText("history").selected).toBeTruthy();
    expect(getByText("all").selected).toBeFalsy();

    // check second select
    userEvent.selectOptions(getAllByRole("combobox")[1], "newest");
    expect(getByText("newest").selected).toBeTruthy();
  });

  it("search input required", () => {
    renderWithRedux(<SearchInputsForm />);
    expect(screen.getByRole("searchbox")).toBeRequired();
  });

  it("check tab focus", () => {
    const { getByRole, getAllByRole } = renderWithRedux(<SearchInputsForm />);
    userEvent.tab();
    expect(getByRole("searchbox")).toHaveFocus();
    userEvent.tab();
    expect(getByRole("searchbox")).not.toHaveFocus();
    expect(getByRole("button")).not.toHaveFocus();
    expect(getAllByRole("combobox")[0]).toHaveFocus();
  });
});
