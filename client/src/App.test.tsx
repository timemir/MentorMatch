import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import { App, WrappedApp } from "./App";

describe("App", () => {
  it("Renders NotFound, if route is invalid", () => {
    // ARRANGE
    const badRoute = "/some/bad/route";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    // ACT
    // Do something for example press a button or something
    // EXPECT
    const notFound = screen.getByRole("heading", { level: 1 });
    expect(notFound).toHaveTextContent("404");
  });
});

// Write a test, that checks if the NavigationBar component gets rendered inside app
