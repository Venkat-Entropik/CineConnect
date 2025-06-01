import React from "react";

import { screen, render, fireEvent } from "@testing-library/react";

import "@testing-library/react";

import HeroBanner from "../HeroBanner";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import useFetch from "../../../../hooks/useFetch";

jest.mock("../../../../hooks/useFetch");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockedUseFetch = useFetch as jest.Mock;

describe("hero baner", () => {
  const HeroBanerWrapper = () => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <HeroBanner />
        </Provider>
      </BrowserRouter>
    );
  };
  it("Should hero baner rendered", () => {
    mockedUseFetch.mockReturnValue({
      data: {
        results: [{ backdrop_path: "/test-image.jpg" }],
      },
      loading: true,
    });
    render(<HeroBanerWrapper />);
    const isHeaderComponentRendered = screen.getByTestId("heroBanner");
    expect(isHeaderComponentRendered).toBeInTheDocument();
  });

  it("Should content rendered", () => {
    mockedUseFetch.mockReturnValue({
      data: {
        results: [{ backdrop_path: "/test-image.jpg" }],
      },
      loading: true,
    });
    render(<HeroBanerWrapper />);
    const HeaderText = screen.getByText(/Welcome./i);
    const description = screen.getByText(
      /Millions of movies, TV shows and people to discover. Explore now./i
    );
    const input = screen.getByPlaceholderText("Search for a movie or tv show....");
    expect(input).toBeInTheDocument();
    expect(HeaderText).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("does not render backdrop image when loading is true", async () => {
    mockedUseFetch.mockReturnValue({
      data: {
        results: [{ backdrop_path: "/test-image.jpg" }],
      },
      loading: true,
    });
    render(<HeroBanerWrapper />);
    const backdrop = screen.queryByTestId("hero-image");
    expect(backdrop).not.toBeInTheDocument();
  });

  test("does  render backdrop image when loading is false", async () => {
    mockedUseFetch.mockReturnValue({
      data: {
        results: [
          { backdrop_path: "/1test-image.jpg" },
          { backdrop_path: "/2test-image.jpg" },
          { backdrop_path: "/3test-image.jpg" },
        ],
      },
      loading: false,
    });
    render(<HeroBanerWrapper />);
    const backdrop = screen.queryByTestId("hero-image");
    expect(backdrop).not.toBeInTheDocument();
  });

  test("does  render backdrop image when loading is false", async () => {
    mockedUseFetch.mockReturnValue({
      data: {
        results: [
          { backdrop_path: "/1test-image.jpg" },
          { backdrop_path: "/2test-image.jpg" },
          { backdrop_path: "/3test-image.jpg" },
        ],
      },
      loading: false,
    });
    render(<HeroBanerWrapper />);
    const input = screen.getByPlaceholderText("Search for a movie or tv show....");

    fireEvent.change(input, { target: { value: "bahubali" } });

    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(input).toHaveValue("bahubali");
    expect(mockNavigate).toHaveBeenCalledWith("/search/bahubali");
  });
});
