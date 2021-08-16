import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UndiscoveredPage from "./undiscovered-page";

describe("UndiscoveredPage", () => {
  it("renders UndiscoveredPage component", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <UndiscoveredPage />
      </Router>
    );
    expect(getByText(/Такой страницы не найдено./i)).toBeInTheDocument();
    expect(getByAltText(/not found icon/i)).toBeInTheDocument();
  });

  it("check link text content and href", () => {
    const { getByRole } = render(
      <Router>
        <UndiscoveredPage />
      </Router>
    );
    expect(getByRole("link")).toHaveAttribute("href", "/");
    expect(getByRole("link")).toHaveTextContent("главную страницу");
  });
});
