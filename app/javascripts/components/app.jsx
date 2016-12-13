/* The App */

import {dataHeadings, dataBody} from "../../data/data";

import React from "react";

import DataTable from "./data-table.jsx";
import Filter from "./filter.jsx";

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

      let filteredEntries = dataBody.filter((dataEntry) => {
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
        <DataTable headingTitles={dataHeadings} rowEntries={this.state.displayData} />
      </div>
    );
  }
}
