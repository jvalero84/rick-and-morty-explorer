import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://rickandmortyapi.com/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
