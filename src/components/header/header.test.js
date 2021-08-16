import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./header";

describe("Header", () => {
  it("renders Header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText(/Search for books/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
