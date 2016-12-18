/* Filter
 * Receives user input for filtering data
*/

import React from "react";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.filterInput.focus();
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleSubmit(event) {
    this.props.onChange(this.filterInput.value);
  }

  render() {
    return (
      <div className="c-filter">
        <input type="text" className="c-filter__input" placeholder={this.props.placeholderText} value={this.props.value} onChange={this.handleChange} ref={(input) => {this.filterInput = input;}} />
        <button className="c-filter__btn" onClick={this.handleSubmit}>&rarr;</button>
      </div>
    );
  }
}
