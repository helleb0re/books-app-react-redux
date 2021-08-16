import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "../help-components";
import UndiscoveredPage from "../undiscovered-page";

import "./book-details.css";

import notAvailableImg from "../../images/not-available.png";

function BookDetails({ bookId, books }) {
  useEffect(() => {
    window.onunload = function () {
      window.scrollTo(0, 0);
    };
  });

  if (books.has(bookId)) {
    const item = books.get(bookId);

    const { imageLinks, categories, authors, title, description } =
      item.volumeInfo;

    const imgSrc = imageLinks
      ? imageLinks.thumbnail.replace("zoom=1", "zoom=0")
      : notAvailableImg;

    return (
      <section className="book-details" data-testid="book-details">
        <Container>
          <div className="book-details__wrapper">
            <img
              className="book-details__cover"
              src={imgSrc}
              alt="book cover"
            />
            <div className="book-details__text-container">
              <span className="book-details__categories">
                {categories ? categories.join(", ") : ""}
              </span>
              <h2 className="book-details__title">{title}</h2>
              <p className="book-details__authors">
                {authors ? authors.join(", ") : ""}
              </p>
              <p className="book-details__description">
                {description ? description : ""}
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return <UndiscoveredPage />;
}

const mapStateToProps = ({ books }) => {
  return {
    books,
  };
};

export default connect(mapStateToProps)(BookDetails);
