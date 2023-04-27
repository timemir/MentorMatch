import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Hero from "./Hero";

describe("Hero Section", () => {
  it("renders the heading", () => {
    const { getByRole } = render(<Hero />, { wrapper: MemoryRouter });
    const heading = getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
