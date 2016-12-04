import PTRoutes from "../../data/routes.json";

import React from "react";

const regx = /_/;

const headingRow = Object.keys(PTRoutes[0]).map((key) =>
  <th key={key}>{key.replace(regx, " ")}</th>
);

const contentRows = PTRoutes.map((content) =>
  <tr key={content.id}>
    {Object.keys(content).map((key) =>
      <td>{content[key]}</td>
    )}
  </tr>
);

export default class DataTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            {headingRow}
          </tr>
        </thead>
        <tbody>
          {contentRows}
        </tbody>
      </table>
    );
  }
}
