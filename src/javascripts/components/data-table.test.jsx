import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import tape from 'tape';

import DataTable from './data-table';

tape('Data Table component', assert => {
  const headingTitles = ['a', 'b', 'c'];
  const rowEntries = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }];

  let container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<DataTable headingTitles={headingTitles} rowEntries={rowEntries} />, container);
  });

  const table = container.querySelector('table');
  const tableHead = container.querySelector('thead');
  const tableBody = container.querySelector('tbody');

  assert.equal(table.tagName, 'TABLE', 'Table element rendered');

  assert.equal(tableHead.tagName, 'THEAD', 'Table heading rendered');
  assert.equal(
    tableHead.childNodes[0].childNodes.length,
    headingTitles.length,
    'Table heading has the right amount of columns',
  );

  assert.equal(tableBody.tagName, 'TBODY', 'Table body rendered');
  assert.equal(
    tableBody.childNodes.length,
    rowEntries.length,
    'Table body has the right amount of rows',
  );
  assert.equal(
    tableBody.childNodes[0].childNodes.length,
    Object.keys(rowEntries[0]).length,
    'Table body row has the right amount of columns',
  );

  document.body.removeChild(container);
  container = null;

  assert.end();
});
