import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("renders the Home component", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    // ACT
    // Do something for example press a button or something
    // EXPECT
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Finde professionelle Mentoren");
  });
});
