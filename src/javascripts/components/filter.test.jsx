import React from 'react';
import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import tape from 'tape';

import Filter from './filter';

tape('Filter component', assert => {
  const propValue = 'test';
  let testVar = 0;

  const testFunction = () => {
    testVar += 10;
  };

  let container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<Filter value={propValue} onChange={testFunction} />, container);
  });

  const input = container.querySelector('input');
  const button = container.querySelector('button');

  assert.ok(input, 'Filter input element rendered');
  assert.equal(input.value, propValue, 'Filter prop value is correct');

  assert.ok(button, 'Filter button is rendered');

  act(() => {
    Simulate.change(input);
  });

  // note: does not test input.value change, component has to be rerendered with new prop
  assert.equal(testVar, 10, 'Filter onChange handler is called when input value changes');

  act(() => {
    Simulate.click(button);
  });

  assert.equal(testVar, 20, 'Filter onChange handler is called when button is clicked');

  document.body.removeChild(container);
  container = null;

  assert.end();
});
