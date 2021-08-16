import { render } from "@testing-library/react";
import ErrorIndicator from "./error-indicator";

describe("ErrorIndicator", () => {
  it("renders ErrorIndicator component", () => {
    const { getByText, getByAltText } = render(<ErrorIndicator />);
    expect(getByText(/Произошла ошибка/i)).toBeInTheDocument();
    expect(getByText(/Попробуйте обновить страницу./i)).toBeInTheDocument();
    expect(getByAltText(/error icon/i)).toBeInTheDocument();
  });
});
