import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders the NotFound component", () => {
    // ARRANGE
    render(<NotFound />);
    // ACT
    // Do something for example press a button or something
    // EXPECT
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("404");
  });
});
