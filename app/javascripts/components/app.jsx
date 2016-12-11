/* The App */

import Data from "../../data/routes.json";

import React from "react";

import DataTable from "./data-table.jsx";
import Filter from "./filter.jsx";

const headingTitles = Object.keys(Data[0]).map((title) =>
  title.replace("_", " ")
);

function isRegexValid(regexStr) {
  let result = true;
  try {
    new RegExp(regexStr);
  }
  catch (e) {
    result = false;
  }

  return result;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      value: "",
      displayData: []
    };
  }

  handleFilterChange(value) {
    if (value !== "" && isRegexValid(value)) {
      const rgx = RegExp(value, "i");

      let filteredEntries = Data.filter((dataEntry) => {
        let match = false;

        for(const key in dataEntry) {
          if(rgx.test(dataEntry[key])) {
            match = true;
          }
        }

        return match;
      });

      this.setState({
        displayData: filteredEntries,
        value: value
      });
    }
    else {
      this.setState({
        displayData: [],
        value: value
      });
    }
  }

  render() {
    return (
      <div>
        <Filter value={this.state.value} onChange={this.handleFilterChange} />
        <DataTable headingTitles={headingTitles} rowEntries={this.state.displayData} />
      </div>
    );
  }
}
