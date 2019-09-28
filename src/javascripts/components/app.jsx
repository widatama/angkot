import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';

import { dataHeadings, dataGet, loadData } from '../../data/data';

import DataTable from './data-table';
import Filter from './filter';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      value: '',
      displayData: [],
    };
  }

  componentDidMount() {
    loadData();
  }

  handleFilterChange(value) {
    dataGet(value).then(result => {
      this.setState({
        displayData: result,
        value,
      });
    });
  }

  render() {
    const { handleFilterChange } = this;
    const { value, displayData } = this.state;

    return (
      <div>
        <Filter value={value} placeholderText="Cari rute" onChange={handleFilterChange} />
        <div className="c-result">
          <DataTable headingTitles={dataHeadings} rowEntries={displayData} />
        </div>
      </div>
    );
  }
}

export default hot(App);
