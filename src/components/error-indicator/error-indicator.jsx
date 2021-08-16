import React from "react";
import { Container } from "../help-components";
import errorIcon from "../../images/warning.svg";

import "./error-indicator.css";

export default function ErrorIndicator() {
  return (
    <Container>
      <div className="error__container">
        <img src={errorIcon} alt="error icon" className="error__picture" />
        <p className="error__message">Произошла ошибка :(</p>
        <p className="error__message">Попробуйте обновить страницу.</p>
      </div>
    </Container>
  );
}
