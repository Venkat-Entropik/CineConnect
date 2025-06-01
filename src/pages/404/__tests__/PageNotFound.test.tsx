import React from "react";
import PageNotFound from "../PageNotFound";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Page not found", () => {
  it("Should page not found rendered", () => {
    render(<PageNotFound />);
    const getPageNotFoundId = screen.getByTestId("pageNotFound");
    expect(getPageNotFoundId).toBeInTheDocument();
  });

  it("Should 404 test displayed", () => {
    render(<PageNotFound />);
    const getHeaderTextRendered = screen.getByText(/404/i);
    expect(getHeaderTextRendered).toBeInTheDocument();
  });

  it("Should Page not found! test displayed", () => {
    render(<PageNotFound />);
    const getDescriptionTextRendered = screen.getByText(/Page not found!/i);
    expect(getDescriptionTextRendered).toBeInTheDocument();
  });
});
