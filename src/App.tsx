import debounce from 'just-debounce';
import React, { useCallback, useState } from 'react';

import getData, { dataHeaders } from '@/modules/data';
import Filter from '@/components/Filter';
import DataTable from '@/components/DataTable';

function App() {
  const [filterValue, setFilterValue] = useState('');
  const [entries, setEntries] = useState([]);

  const debouncedGetData = debounce(async (query) => {
    const res = await getData(query);
    setEntries(res as never[]);
  }, 300);

  const handleFilterSubmit = useCallback((newFilterValue: string) => {
    setFilterValue(newFilterValue);
    debouncedGetData(newFilterValue);
  }, [filterValue]);

  return (
    <div className="wrap mx-auto my-8 flex flex-col">
      <Filter filterValue={filterValue} placeholderText="Cari rute" onSubmit={handleFilterSubmit} />
      { entries.length > 0 && <DataTable titles={dataHeaders} entries={entries} /> }
    </div>
  );
}

export default App;
