import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  const query = "test";
  it("renders the Input component", () => {
    // ARRANGE
    render(<FilterBar query={query} />, { wrapper: MemoryRouter });
    // ACT
    // Do something for example press a button or something
    const input: HTMLInputElement = screen.getByPlaceholderText(
      "Search by company, role or language"
    );
    // EXPECT
    expect(input).toBeInTheDocument();
    // Check if the input value is the same as the passed prop
    expect(input.value).toBe(query);
  });

  it("renders the Apply Filter Button", () => {
    // ARRANGE
    render(<FilterBar query={query} />, { wrapper: MemoryRouter });
    // ACT
    // Do something for example press a button or something
    // Check if the 'Apply Filter' button is rendered correctly
    const applyFilterButton = screen.getByText("Apply Filter");
    expect(applyFilterButton).toBeInTheDocument();

    // Check if the 'Apply Filter' button is enabled
    expect(applyFilterButton).toBeEnabled();
  });
});
