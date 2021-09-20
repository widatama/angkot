import debounce from 'just-debounce';
import React from 'react';

import DataTable from '../components/DataTable';
import Filter from '../components/Filter';

import getData, { dataHeaders } from '../data';

type AppProps = {}


class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.filterRef = React.createRef();
    this.state = {
      filterValue: '',
      titles: dataHeaders,
      entries: [],
    };
  }

  debouncedGetData = debounce(async (query) => {
    const res = await getData(query);
    this.setState({ entries: res });
  }, 300);

  handleFilterSubmit(filterValue) {
    this.setState({ filterValue });
    this.debouncedGetData(filterValue);
  }

  componentDidMount() {
    this.filterRef.current.focus();
  }

  render() {
    const { filterRef, handleFilterSubmit } = this;
    const { entries, filterValue, titles } = this.state;

    return (
      <div className="wrap mx-auto my-8 flex flex-col">
        <Filter value={filterValue} placeholderText="Cari rute" ref={filterRef} onSubmit={handleFilterSubmit} />
        { entries.length > 0 &&
          <DataTable titles={titles} entries={entries} />
        }
      </div>
    );
  }
}

export default App;
