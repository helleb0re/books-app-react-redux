import { createContext } from "react";

const { Provider: BooksServiceProvider, Consumer: BooksServiceConsumer } =
  createContext();

export { BooksServiceProvider, BooksServiceConsumer };
