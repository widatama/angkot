/* The App */

import {dataHeadings, dataBody, dataGet} from "../../data/data";

import React from "react";

import DataTable from "./data-table.jsx";
import Filter from "./filter.jsx";

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
    dataGet(value).then((result) => {
      this.setState({
        displayData: result,
        value: value
      });
    });
  }

  render() {
    return (
      <div>
        <Filter value={this.state.value} placeholderText="Cari rute" onChange={this.handleFilterChange} />
        <div className="c-result">
          <DataTable headingTitles={dataHeadings} rowEntries={this.state.displayData} />
        </div>
      </div>
    );
  }
}
