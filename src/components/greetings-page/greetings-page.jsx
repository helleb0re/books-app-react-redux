import React from "react";
import { Container } from "../help-components";

import "./greetings-page.css";

function GreetingsPage() {
  return (
    <Container>
      <p className="greetings-page__message">
        Приветствую вас на главной странице приложения для поиска книг. Введите
        любое слово или словосочетание связанное с книгой, которую вы ищете, в
        поле ввода и нажмите поиск.
      </p>
    </Container>
  );
}

export default GreetingsPage;
