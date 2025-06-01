import React from "react";

import SwitchTabs from "../SwitchTabs";

import { screen, render } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("Switch Tabs", () => {
  it("should swithc tabs rendred", () => {
    render(<SwitchTabs data={["Movies", "TV Shows"]} onTabChange={() => {}} />);
  });

  const isSwtichTabsRendred = screen.getByTestId("switchingTabs");
  expect(isSwtichTabsRendred).toBeInTheDocument();
});
