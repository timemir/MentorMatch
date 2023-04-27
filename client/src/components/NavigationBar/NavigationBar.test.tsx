import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import NavigationBar from "./NavigationBar";

describe("NavigationBar", () => {
  it("renders the hamburger button", () => {
    const { getByRole } = render(<NavigationBar />, { wrapper: MemoryRouter });
    const hamburgerButton = getByRole("button");
    expect(hamburgerButton).toBeInTheDocument();
  });

  it("toggles the hamburger menu when the hamburger button is clicked", () => {
    const { getByRole, queryByTestId } = render(<NavigationBar />, {
      wrapper: MemoryRouter,
    });
    const hamburgerButton = getByRole("button");
    fireEvent.click(hamburgerButton);

    const hamburgerMenu = queryByTestId("navbar-default");
    expect(hamburgerMenu).not.toHaveClass("hidden");

    fireEvent.click(hamburgerButton);
    expect(hamburgerMenu).toHaveClass("hidden");
  });

  it("displays the logo", () => {
    const { getByAltText } = render(<NavigationBar />, {
      wrapper: MemoryRouter,
    });
    const logoImage = getByAltText("MentorMatch Logo");
    expect(logoImage).toBeInTheDocument();
  });
});
