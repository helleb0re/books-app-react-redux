import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchNewBooksByQuery } from "../../actions";

import { withBooksService } from "../hoc";
import CustomSelect from "../categories-input";
import { Container } from "../help-components";
import QueryInput from "../query-input/query-input";

import { categories, sortByVariants } from "../../constants";

import "./search-inputs-form.css";

function SearchInputsForm({ fetchNewBooksByQuery }) {
  const history = useHistory();
  const [queryInput, setQueryInput] = useState("");
  const [categoriesInput, setCategoriesValue] = useState(categories[0].name);
  const [sortByInput, setSortByInput] = useState(sortByVariants[0].name);

  const onChangeFuncMaker = (setState) => (e) => {
    setState(e.target.value);
  };

  const sendQuery = (e) => {
    e.preventDefault();
    history.replace("/");
    fetchNewBooksByQuery({
      query: queryInput,
      category: categoriesInput,
      sortBy: sortByInput,
    });
    setQueryInput("");
  };

  return (
    <section className="search-form">
      <Container>
        <form className="search-form__wrapper" onSubmit={sendQuery}>
          <QueryInput
            value={queryInput}
            onChange={onChangeFuncMaker(setQueryInput)}
          />

          <div className="search-form__selectors-wrapper">
            <CustomSelect
              value={categoriesInput}
              onChange={onChangeFuncMaker(setCategoriesValue)}
              optionValues={categories}
              title={"Categories"}
            />
            <CustomSelect
              value={sortByInput}
              onChange={onChangeFuncMaker(setSortByInput)}
              optionValues={sortByVariants}
              title={"Sort by"}
            />
          </div>
        </form>
      </Container>
    </section>
  );
}

const mapDispatchToProps = (dispatch, { booksService }) => {
  return {
    fetchNewBooksByQuery: (requestParameters) => {
      return fetchNewBooksByQuery(dispatch, booksService)(requestParameters);
    },
  };
};

export default compose(
  withBooksService(),
  connect(null, mapDispatchToProps)
)(SearchInputsForm);
