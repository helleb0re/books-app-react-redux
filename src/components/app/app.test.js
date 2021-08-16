import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducers";
import App from "./app";
import userEvent from "@testing-library/user-event";
import BooksService from "../../services/books-service";
import { BooksServiceProvider } from "../../contexts";

const renderWithReduxContextRouter = (
  component,
  { store = createStore(reducer) } = {},
  { booksService = new BooksService() } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <BooksServiceProvider value={booksService}>
          <Router>{component}</Router>
        </BooksServiceProvider>
      </Provider>
    ),
    store,
  };
};

describe("App", () => {
  test("App render", () => {
    renderWithReduxContextRouter(<App />);
  });
  test("check visible loading spinner", () => {
    const { getByRole, getByTestId } = renderWithReduxContextRouter(<App />);
    expect(getByRole("searchbox")).toBeInTheDocument();
    // вводим запрос в search input
    userEvent.type(getByRole("searchbox"), "test");

    // отправляем запрос с текстом
    userEvent.click(getByRole("button"));

    // проверяем появились ли спиннер
    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });
  test("check search request", async () => {
    const { getByRole, findByTestId } = renderWithReduxContextRouter(<App />);
    expect(getByRole("searchbox")).toBeInTheDocument();
    // вводим запрос в search input
    userEvent.type(getByRole("searchbox"), "test");

    // отправляем запрос с текстом
    userEvent.click(getByRole("button"));

    // проверяем появились ли книги
    const booksListSection = await findByTestId("books-list 1");
    expect(booksListSection).toBeInTheDocument();
  });
  test("check load book details", async () => {
    const { getByRole, findByTestId, getAllByTestId } =
      renderWithReduxContextRouter(<App />);
    expect(getByRole("searchbox")).toBeInTheDocument();
    // вводим запрос в search input
    userEvent.type(getByRole("searchbox"), "test");

    // отправляем запрос с текстом
    userEvent.click(getByRole("button"));
    // ожидаем загрузки страницы с книгами
    await findByTestId("books-list 1");
    // проверяем переход на страницу с информацией о книге
    userEvent.click(
      getAllByTestId("books-list__item")[0].getElementsByClassName("link")[0]
    );
    const bookDetailsSection = await findByTestId("book-details");
    expect(bookDetailsSection).toBeInTheDocument();
  });
  test("checking the ability to go back from book-details", async () => {
    const { getByRole, findByTestId, getAllByTestId, getAllByRole } =
      renderWithReduxContextRouter(<App />);
    expect(getByRole("searchbox")).toBeInTheDocument();
    // вводим запрос в search input
    userEvent.type(getByRole("searchbox"), "test");

    // отправляем запрос с текстом
    userEvent.click(getByRole("button"));
    // ожидаем загрузки страницы с книгами
    await findByTestId("books-list 1");
    // проверяем переход на страницу с информацией о книге
    userEvent.click(
      getAllByTestId("books-list__item")[0].getElementsByClassName("link")[0]
    );
    // ожидаем загрузки страницы с информацией о книге
    await findByTestId("book-details");
    // нажимаем на ссылку в header, чтобы вернуться назад
    userEvent.click(getAllByRole("link")[0]);
    const againBooksListSection = await findByTestId("books-list 1");
    expect(againBooksListSection).toBeInTheDocument();
  });
  test("checking button loading more", async () => {
    const { getByRole, findByTestId, getAllByTestId, getAllByRole } =
      renderWithReduxContextRouter(<App />);
    expect(getByRole("searchbox")).toBeInTheDocument();
    // вводим запрос в search input
    userEvent.type(getByRole("searchbox"), "test");

    // отправляем запрос с текстом
    userEvent.click(getByRole("button"));
    // ожидаем загрузки страницы с книгами
    await findByTestId("books-list 1");
    // фиксируем количество книг изначально
    const firstLength = getAllByTestId("books-list__item").length;
    // подгружаем новые книги
    userEvent.click(getAllByRole("button")[1]);
    // ждем загрузки второй страницы
    await findByTestId("books-list 2");
    // проверка, что появились новые книги
    const secondLength = getAllByTestId("books-list__item").length;
    expect(firstLength <= secondLength).toBeTruthy();
  });
});
