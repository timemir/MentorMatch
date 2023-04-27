import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import SearchBar from "./SearchBar";

describe("Hero - Searchbar", () => {
  it("renders the searchbar", () => {
    render(<SearchBar />, { wrapper: MemoryRouter });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should update the search query state when the input changes", () => {
    const { getByPlaceholderText } = render(<SearchBar />, {
      wrapper: MemoryRouter,
    });
    const input = getByPlaceholderText(
      "z.B. Programmieren lernen"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  it("should handle the search button being clicked", () => {
    const { getByText } = render(<SearchBar />, { wrapper: MemoryRouter });
    const button = getByText("Suchen");

    fireEvent.click(button);
    // Assert that the search is handled correctly (e.g. redirect to search page with query parameter)
  });

  it("should handle popular search button being clicked", () => {
    const { getByText } = render(<SearchBar />, { wrapper: MemoryRouter });
    const button = getByText("Programmieren");

    fireEvent.click(button);
    // Assert that the popular search is handled correctly (e.g. logs the innerHTML of the button)
  });
});
