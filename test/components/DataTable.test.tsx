import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';

import { Body, Header } from '@/components/DataTable';

describe('Header component', () => {
  beforeEach(() => {
    const { body } = document;
    body.textContent = '';
  });

  const titles = ['one', 'two'];

  test('Renders table header', () => {
    const tableEl = document.createElement('table');
    const { container } = render(<Header titles={titles} />, {
      container: document.body.appendChild(tableEl),
    });

    expect(container.querySelector('thead')).toBeTruthy();
    expect(screen.getByText(/one/i)).toBeTruthy();
    expect(screen.getByText(/two/i)).toBeTruthy();
  });
});

describe('Body component', () => {
  const entries = [
    ['one', 'two'],
    ['three', 'four'],
  ];

  test('Renders table body', () => {
    const tableEl = document.createElement('table');
    const { container } = render(<Body entries={entries} />, {
      container: document.body.appendChild(tableEl),
    });

    expect(container.querySelector('tbody')).toBeTruthy();
    expect(screen.getByText(/two/i, { selector: 'td' })).toBeTruthy();
    expect(screen.getByText(/four/i, { selector: 'td' })).toBeTruthy();
  });
});
