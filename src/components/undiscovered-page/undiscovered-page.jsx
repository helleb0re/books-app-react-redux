import React from "react";
import { Container } from "../help-components";
import CustomLink from "../custom-link";

import "./undiscovered-page.css";

import notFoundIcon from "../../images/not-found.svg";

function UndiscoveredPage() {
  return (
    <Container>
      <div className="undiscovered-page__container">
        <img
          src={notFoundIcon}
          alt="not found icon"
          className="undiscovered-page__picture"
        />
        <p className="undiscovered-page__message">Такой страницы не найдено.</p>
        <p className="undiscovered-page__message" data-testid='second-message'>
          Вернитесь на
          {
            <CustomLink withUnderline={true} to="/">
              главную страницу
            </CustomLink>
          }
          .
        </p>
      </div>
    </Container>
  );
}

export default UndiscoveredPage;
