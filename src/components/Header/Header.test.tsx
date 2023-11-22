import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header component", () => {
  it("renders text and link", () => {
    render(<Header />);

    // Check if the component renders the text
    const textElement = screen.getByText(/ZORA Front-end Assignment/i);
    expect(textElement).toBeInTheDocument();

    // Check if the link to GitHub is present
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/hdr-js/unsplash-search"
    );
  });

  it("renders CodeBracketIcon", () => {
    render(<Header />);

    // Check if the CodeBracketIcon is present
    const iconElement = screen.getByTestId("code-bracket-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
