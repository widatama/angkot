/* Data Table
 * Receives an array of string as table heading and an array of object as table body
*/

import React from "react";

const baseClassName = "c-data-table";

function generateClassNameModifier(name) {
  return name.replace(/ /g, "-").toLowerCase();
}

function Heading(props) {
  return (
    <thead className={baseClassName  + "__heading"}>
      <tr>
        {props.titles.map((key) => {
          if (!/~/.test(key)) {
            return <th className={baseClassName  + "__heading-col " + baseClassName + "__heading-col--" + generateClassNameModifier(key)} key={key}>{key}</th>
          }
        })}
      </tr>
    </thead>
  );
}

function Rows(props) {
  if (props.entries) {
    return (
      <tbody className={baseClassName  + "__body"}>
        {props.entries.map((row) =>
          <tr className={baseClassName + "__body-row"} key={row["~id"]}>
            {Object.keys(row).map((key) => {
              if (!/~/.test(key)) {
                return <td className={baseClassName + "__body-col"} key={key} dangerouslySetInnerHTML={{__html: row[key]}}></td>
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
      <table className="c-data-table">
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
