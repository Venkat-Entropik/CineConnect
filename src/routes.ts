import React from "react";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";

interface elementProps {
  path: string;
  element: React.ComponentType;
}

export interface routesProps {
  routeProps: elementProps;
  name: string;
}

export const routes: routesProps[] = [
  {
    routeProps: {
      path: "/",
      element: Home,
    },
    name: "Home",
  },
  {
    routeProps: {
      path: "/:mediaType/:id",
      element: Details,
    },
    name: "Details",
  },
  {
    routeProps: {
      path: "/search/:query",
      element: SearchResult,
    },
    name: "SearchResult",
  },
  {
    routeProps: {
      path: "/explore/:mediaType",
      element: Explore,
    },
    name: "Explore",
  },
  {
    routeProps: {
      path: "*",
      element: PageNotFound,
    },
    name: "PageNotFound",
  },
];
