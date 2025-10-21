import React, { useEffect, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/interceptor";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { routes, routesProps } from "./routes";

interface ApiConfig {
  backdrop: string;
  poster: string;
  profile: string;
}

interface Genre {
  id: number;
  name: string;
}

interface RootState {
  home: {
    url: ApiConfig;
  };
}

const App: FC = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state: RootState) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then(res => {
      const url: ApiConfig = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    const promises: Promise<unknown>[] = [];
    const endPoints: string[] = ["tv", "movie"];
    const allGenres: { [key: number]: Genre } = {};

    endPoints.forEach(url => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item: Genre) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route: routesProps) => {
          return (
            <Route
              path={route.routeProps.path}
              element={<route.routeProps.element />}
              key={route.name}
            />
          );
        })}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
