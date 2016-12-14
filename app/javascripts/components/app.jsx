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

function generateSearchRegex(rawStr) {
  let result = rawStr.split(" ");

  result = result.map((chunk) => {
    return "(?=.*" + chunk + ")";
  });

  return result.join("") + ".";
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
    let searchRegex = generateSearchRegex(value);
    if (value !== "" && isRegexValid(searchRegex)) {
      const rgx = RegExp(searchRegex, "ig");

      let filteredEntries = dataBody.filter((dataEntry) => {
        let match = false;

        if (rgx.test(dataEntry["~digest"])) {
          match = true;
        }

        //for(const key in dataEntry) {
          //if(rgx.test(dataEntry[key])) {
            //match = true;
          //}
        //}

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
