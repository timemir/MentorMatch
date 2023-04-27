import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Search from "./Search";

describe("Search", () => {
  it("renders the TabInterface component", () => {
    // ARRANGE
    render(<Search />, { wrapper: MemoryRouter });
    // ACT
    // Do something for example press a button or something
    const TabOne = screen.getByText("Mentors");
    const TabTwo = screen.getByText("Topics");

    expect(TabOne).toBeInTheDocument();
    expect(TabTwo).toBeInTheDocument();
    // EXPECT
  });
});
