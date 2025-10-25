import React, { useEffect, FC, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/interceptor";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { routes, routesProps } from "./routes";
import apiService from "./services/apiService";
import useFetch from "./hooks/useFetch";

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

  useEffect(() => {
    genresCall();
  }, []);

  const fetchConfig = useCallback(() => apiService.getConfigurations(), []);
  useFetch(fetchConfig, {
    onSuccess: res => {
      
      const url = {
        backdrop: res.data.images.secure_base_url + "original",
        poster: res.data.images.secure_base_url + "original",
        profile: res.data.images.secure_base_url + "original",
      };
      
      dispatch(getApiConfiguration(url));
      console.log("url", url);
      
    },
    onError: errMsg => {
      console.error("Config fetch failed:", errMsg);
    },
  });

  const genresCall = async () => {
    const promises: Promise<unknown>[] = [];
    const endPoints: string[] = ["tv", "movie"];
    const allGenres: { [key: number]: Genre } = {};

    endPoints.forEach(url => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
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
