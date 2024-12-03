import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import Layout from "../layout/Layout";
import { useEffect } from "react";

const ExternalRedirect = ({ url }: { url: string }) => {
  //   useEffect(() => {
  //     // Proverava da li je kartica već otvorena
  //     const existingWindow = window.open("", "_blank");

  //     if (existingWindow) {
  //       existingWindow.location.href = url;
  //     }
  //   }, [url]); // Poziva se samo kada se URL promeni
  useEffect(() => {
    window.location.replace(url);
  }, []);
  return null; // Komponenta ne renderuje ništa
};
export const router = createBrowserRouter([
  {
    element: <App />, // root layout route
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "etfis",
            element: <ExternalRedirect url="https://www.etf.ues.rs.ba/" />,
          },
        ],
      },
    ],
  },
]);
