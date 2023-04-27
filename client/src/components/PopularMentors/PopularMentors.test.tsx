/* eslint-disable react/jsx-props-no-spreading */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import PopularMentors from "./PopularMentors";

describe("PopularMentors - Homepage Section", () => {
  it("renders the section", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <PopularMentors />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    const section = screen.getByRole("heading", { level: 2 });

    expect(section).toHaveTextContent("Beliebte Mentoren");
  });
});
