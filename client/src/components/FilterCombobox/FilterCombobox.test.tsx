import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import FilterCombobox from "./FilterCombobox";

describe("FilterCombobox", () => {
  const data = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

  it("should display the correct placeholder title", () => {
    render(<FilterCombobox title="Title" data={data} />, {
      wrapper: MemoryRouter,
    });
    const comboBox = screen.getByPlaceholderText("Title");
    expect(comboBox).toBeInTheDocument();
  });

  it("should display the correct options, when pressing the expand button", () => {
    render(<FilterCombobox title="Title" data={data} />);
    const button = screen.getByTestId("expand-button");
    fireEvent.click(button);

    data.forEach((entry) => {
      const option = screen.getByText(entry.name);
      expect(option).toBeInTheDocument();
    });
  });

  it("should filter options correctly", () => {
    render(<FilterCombobox title="Title" data={data} />);
    const input = screen.getByPlaceholderText("Title");

    fireEvent.change(input, { target: { value: "Option 2" } });
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(() => screen.getByText("Option 1")).toThrow();
    expect(() => screen.getByText("Option 3")).toThrow();

    fireEvent.change(input, { target: { value: "Option" } });
    data.forEach((entry) => {
      const option = screen.getByText(entry.name);
      expect(option).toBeInTheDocument();
    });
  });

  it("should display a message when no options are found", () => {
    const { getByText, getByPlaceholderText } = render(
      <FilterCombobox title="Title" data={data} />
    );
    const input = getByPlaceholderText("Title");

    fireEvent.change(input, { target: { value: "Invalid Option" } });
    expect(getByText("Nothing found.")).toBeInTheDocument();
  });

  it("should set selected entry correctly", () => {
    render(<FilterCombobox title="Title" data={data} />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Title");

    // Open the combobox.
    const button = screen.getByTestId("expand-button");
    fireEvent.click(button);

    // Select the second option and click it.
    const option = screen.getByText("Option 2");
    fireEvent.click(option);

    expect(input.value).toBe("Option 2");
  });
});
