/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import CardList from "./CardList";

const testData = [
  {
    title: "Max Mustermann",
    description: "Ich bin eins guter Mentor",
    buttonText: "Mentor anfragen",
    image: "https://source.unsplash.com/random/400x200",
    imageAlt: "Mentorship",
    link: "/",
  },
  {
    title: "Peter Zwegat",
    description: "Ich bin zwei guter Mentor",
    buttonText: "Mentor anfragen",
    image: "https://source.unsplash.com/random/400x200",
    imageAlt: "Mentorship 2",
    link: "/",
  },
];

describe("CardList - Component", () => {
  it("should render the correct number of cards", () => {
    render(<CardList cardData={testData} />, { wrapper: MemoryRouter });
    const cardElements = screen.getAllByTestId("card");
    expect(cardElements).toHaveLength(testData.length);
  });

  it("renders cards with correct props", () => {
    render(<CardList cardData={testData} />, { wrapper: MemoryRouter });
    const cardElements = screen.getAllByTestId("card");

    expect(cardElements[0] && cardElements[1]).toHaveTextContent(
      "Mentor anfragen"
    );
    expect(cardElements[0]).toHaveTextContent("Max Mustermann");
    expect(cardElements[1]).toHaveTextContent("Peter Zwegat");

    // Test if the image is rendered
    expect(cardElements[0]).toContainElement(screen.getByAltText("Mentorship"));

    // Test if all the buttons are rendered
    const buttonElements = screen.getAllByTestId("card-link");
    expect(buttonElements).toHaveLength(testData.length);
  });
});
