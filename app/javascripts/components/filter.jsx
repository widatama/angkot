/* Filter
 * Receives user input and filters data entries based on that input
*/

import React from "react";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange} />
    );
  }
}
