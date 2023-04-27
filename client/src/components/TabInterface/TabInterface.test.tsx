import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import TabInterface from "./TabInterface";

describe("TabInterface - Component", () => {
  it("should pass the query to the searchbar", () => {
    // ARRANGE
    render(<TabInterface query="test" />, { wrapper: MemoryRouter });
    // ACT
    // Do something for example press a button or something
    const SearchBar: HTMLInputElement = screen.getByRole("textbox");
    expect(SearchBar.value).toBe("test");
    // EXPECT
  });
  it("should render the correct amount of cards", () => {
    // ARRANGE
    render(<TabInterface query="test" />, { wrapper: MemoryRouter });
    // ACT
    // Do something for example press a button or something
    const AmountOfCards = screen.getAllByTestId("card");

    expect(AmountOfCards).toHaveLength(10);
    // EXPECT
  });
});
