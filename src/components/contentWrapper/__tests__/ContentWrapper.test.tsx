import React from "react";
import ContentWrapper from "../ContentWrapper";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Content Wrapper", () => {
  it("Should content wrapper rendered", () => {
    const dummyChildren = <div>Hello World</div>;
    render(<ContentWrapper>{dummyChildren}</ContentWrapper>);
    const isContentWrapperRendered = screen.getByTestId("content-wrapper");
    expect(isContentWrapperRendered).toBeInTheDocument();
  });

  it("is children rendered", () => {
    const dummyChildren = <div>Hello World</div>;
    render(<ContentWrapper>{dummyChildren}</ContentWrapper>);
    const isChildrenRendered = screen.getByText(/Hello World/i);
    expect(isChildrenRendered).toBeInTheDocument();
  });
});
