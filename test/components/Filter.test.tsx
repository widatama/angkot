import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';

import Filter from '@/components/Filter';

describe('Filter component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const testInput = 'something';

  test('Accepts placeholder text', () => {
    const { container } = render(
      <Filter filterValue="filter" placeholderText={testInput} onSubmit={() => {}} />,
    );

    const input = container.querySelector('input');

    expect(input?.placeholder).toBe(testInput);
  });

  test('Accepts filter value', () => {
    const { container } = render(
      <Filter filterValue={testInput} placeholderText="placeholder" onSubmit={() => {}} />,
    );

    const input = container.querySelector('input');

    expect(input?.value).toBe(testInput);
  });

  test('Emits event when button is clicked', () => {
    const testHandler = () => {};
    const mock = vi.fn().mockImplementation(testHandler);

    const { container } = render(
      <Filter filterValue="filter" placeholderText="placeholder" onSubmit={mock} />,
    );

    const button = container.querySelector('button');

    fireEvent.click(button as HTMLButtonElement);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('Emits event when input value changes', () => {
    const testHandler = () => {};
    const mock = vi.fn().mockImplementation(testHandler);

    const { container } = render(
      <Filter filterValue="filter" placeholderText="placeholder" onSubmit={mock} />,
    );

    const input = container.querySelector('input');

    fireEvent.change(input as HTMLInputElement, { target: { value: testInput } });

    expect(mock).toHaveBeenCalledWith(testInput);
  });
});
