/* Data Table
 * Receives an array of string as table heading and an array of object as table body
*/

import React from "react";

function Heading(props) {
  return (
    <thead>
      <tr>
        {props.titles.map((key) => {
          if (key !== "id") {
            return <th key={key}>{key}</th>
          }
        })}
      </tr>
    </thead>
  );
}

function Rows(props) {
  return (
    <tbody>
      {props.entries.map((row) =>
        <tr key={row.id}>
          {Object.keys(row).map((key) => {
            if (key !== "id") {
              return <td key={key}>{row[key]}</td>
            }
          })}
        </tr>
      )}
    </tbody>
  );
}

export default class DataTable extends React.Component {
  render() {
    return (
      <table>
        <Heading titles={this.props.headingTitles}/>
        <Rows entries={this.props.rowEntries}/>
      </table>
    );
  }
}
