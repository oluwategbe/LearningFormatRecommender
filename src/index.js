import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </QueryClientProvider>
);
