/* Data Table
 * Receives an array of string as table heading and an array of object as table body
*/

import React from "react";

function Heading(props) {
  return (
    <thead>
      <tr>
        {props.titles.map((key) => {
          if (!/~/.test(key)) {
            return <th key={key}>{key}</th>
          }
        })}
      </tr>
    </thead>
  );
}

function Rows(props) {
  if (props.entries) {
    return (
      <tbody>
        {props.entries.map((row) =>
          <tr key={row["~id"]}>
            {Object.keys(row).map((key) => {
              if (!/~/.test(key)) {
                return <td key={key}>{row[key]}</td>
              }
            })}
          </tr>
        )}
      </tbody>
    );
  }
  else {
    return null;
  }
}

function Table(props) {
  if (props.rowEntries.length > 0) {
    return (
      <table>
        <Heading titles={props.headingTitles} />
        <Rows entries={props.rowEntries} />
      </table>
    );
  }
  else {
    return null;
  }
}

export default class DataTable extends React.Component {
  render() {
    return (
      <Table headingTitles={this.props.headingTitles} rowEntries={this.props.rowEntries} />
    );
  }
}
