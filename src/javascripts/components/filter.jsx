/* Filter
 * Receives user input for filtering data
 */

import PropTypes from 'prop-types';
import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.filterInput.focus();
  }

  handleChange(event) {
    const { value } = event.target;
    const { onChange } = this.props;

    onChange(value);
  }

  handleSubmit() {
    const { value } = this.filterInput;
    const { onChange } = this.props;

    onChange(value);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { placeholderText, value } = this.props;

    return (
      <div className="c-filter">
        <input
          type="text"
          className="c-filter__input"
          placeholder={placeholderText}
          value={value}
          onChange={handleChange}
          ref={input => {
            this.filterInput = input;
          }}
        />
        <button className="c-filter__btn" onClick={handleSubmit} type="button">
          &rarr;
        </button>
      </div>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func,
  placeholderText: PropTypes.string,
  value: PropTypes.string,
};

Filter.defaultProps = {
  value: '',
  placeholderText: '',
  onChange: () => {},
};

export default Filter;
