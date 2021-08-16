import { render } from "@testing-library/react";
import GreetingsPage from "./greetings-page";

describe("GreetingsPage", () => {
  it("renders GreetingsPage component", () => {
    const { getByText } = render(<GreetingsPage />);
    expect(
      getByText(
        /Приветствую вас на главной странице приложения для поиска книг. Введите любое слово или словосочетание связанное с книгой, которую вы ищете, в поле ввода и нажмите поиск./i
      )
    ).toBeInTheDocument();
  });
});
