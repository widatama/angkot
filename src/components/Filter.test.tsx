import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Filter from './Filter';

describe('Filter component', () => {
  const testInput = 'something';

  test('accepts placeholder text', () => {
    const { container } = render(<Filter ref={createRef()} placeholderText={testInput} onSubmit={() => {}} />);

    const input = container.querySelector('input');

    expect(input.placeholder).toBe(testInput);
  });

  test('accepts filter value', () => {
    const { container } = render(<Filter ref={createRef()} value={testInput} onSubmit={() => {}} />);

    const input = container.querySelector('input');

    expect(input.value).toBe(testInput);
  });

  test('submits event when button is clicked', () => {
    const testHandler = jest.fn();

    const { container } = render(<Filter ref={createRef()} value={testInput} onSubmit={testHandler} />);

    const button = container.querySelector('button');

    fireEvent.click(button);

    expect(testHandler.mock.calls[0][0]).toBe(testInput);
  });

  test('submits event when input value changes', () => {
    const testHandler = jest.fn();

    const { container } = render(<Filter ref={createRef()} value="something else" onSubmit={testHandler} />);

    const input = container.querySelector('input');

    fireEvent.change(input, { target: { value: testInput } });

    expect(testHandler.mock.calls[0][0]).toBe(testInput);
  });
});
