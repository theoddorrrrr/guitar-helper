import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

import Layout from "./components/Layout";

import "./styles/App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={<Layout>{React.createElement(route.element)}</Layout>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
