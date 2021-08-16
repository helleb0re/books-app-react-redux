import React from "react";
import CustomLink from "../custom-link";

import "./books-list-item.css";

function BooksListItem({ imageSrc, category, authors, title, id }) {
  const authorsConfigured = authors.join(", ");

  return (
    <div className="books-list__item" data-testid="books-list__item">
      <CustomLink to={`/book/${id}`}>
        <img className="books-list__cover" src={imageSrc} alt="book cover" />
      </CustomLink>
      <div className="books-list__item-text-container">
        <span className="books-list__item-category">{category}</span>
        <CustomLink to={`/book/${id}`}>
          <h3 className="books-list__item-title" title={title}>
            {title}
          </h3>
        </CustomLink>
        <p className="books-list__item-authors">{authorsConfigured}</p>
      </div>
    </div>
  );
}

export default BooksListItem;
