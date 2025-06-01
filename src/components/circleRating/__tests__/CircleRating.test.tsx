import React from "react";
import CircleRating from "../CircleRating";

import { screen, render } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("Circle rating", () => {
  it("should circle rating rendered", () => {
    render(<CircleRating rating={5} />);
    const isCircleRating = screen.getByTestId("circleRating");
    expect(isCircleRating).toBeInTheDocument();
  });
});
