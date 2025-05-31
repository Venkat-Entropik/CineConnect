import React from "react";

import Footer from "../Footer";

import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("footer", () => {
  it("Should footer component rendered", () => {
    render(<Footer />);
    const isFooterCoponentRendered = screen.getByTestId("footer");
    expect(isFooterCoponentRendered).toBeInTheDocument();
  });

  it("Should footer menu items rendered", () => {
    const menuItems: string[] = ["Terms Of Use", "Privacy-Policy", "About", "Blog", "FAQ"];
    render(<Footer />);

    menuItems.forEach((item: string) => {
      const isMenuItemRendered = screen.getByText(item);
      expect(isMenuItemRendered).toBeInTheDocument();
    });
  });
});
