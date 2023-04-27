/* eslint-disable react/jsx-props-no-spreading */
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Card, { CardProps } from "./Card";

describe("Card - Component", () => {
  let cardProps: CardProps;

  beforeEach(() => {
    cardProps = {
      title: "Test Title",
      description: "Test Description",
      buttonText: "Learn More",
      image: "test.jpg",
      imageAlt: "Test Image",
    };
  });

  it("should render the title, description, button, and image", () => {
    const { getByText, getByAltText } = render(<Card {...cardProps} />, {
      wrapper: MemoryRouter,
    });

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
    expect(getByText("Learn More")).toBeInTheDocument();
    expect(getByAltText("Test Image")).toBeInTheDocument();
  });

  it("should render a link to the provided link", () => {
    const { getByTestId } = render(<Card {...cardProps} link="/test" />, {
      wrapper: MemoryRouter,
    });
    const link = getByTestId("card-link");
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("should render a link to the default link when no link is provided", () => {
    const { getByTestId } = render(<Card {...cardProps} />, {
      wrapper: MemoryRouter,
    });
    const link = getByTestId("card-link");
    expect(link.getAttribute("href")).toBe("/");
  });
});
