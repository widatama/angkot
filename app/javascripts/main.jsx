import PTRoutes from "../data/routes.json";

import "../stylesheets/app.css";

import React from "react";
import ReactDOM from "react-dom";

import DataTable from "./components/data-table.jsx";

const headingTitles = Object.keys(PTRoutes[0]).map((title) =>
  title.replace("_", " ")
);

ReactDOM.render(
  <DataTable headingTitles={headingTitles} rowEntries={PTRoutes}/>,
  document.getElementById("react")
);
