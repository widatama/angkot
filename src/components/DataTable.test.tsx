import { render, screen } from '@testing-library/react';
import { Body, Header } from './DataTable';

describe('Header component', () => {
  const titles = ['one', 'two'];

  test('does not render anything', () => {
    const tableEl = document.createElement('table');
    const { container } = render(<Header />, {
      container: document.body.appendChild(tableEl),
    });

    expect(container.querySelector('thead')).toBeFalsy();
  });

  test('renders table header', () => {
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

  test('does not render anything', () => {
    const tableEl = document.createElement('table');
    const { container } = render(<Body />, {
      container: document.body.appendChild(tableEl),
    });

    expect(container.querySelector('tbody')).toBeFalsy();
  });

  test('renders table body', () => {
    const tableEl = document.createElement('table');
    const { container } = render(<Body entries={entries} />, {
      container: document.body.appendChild(tableEl),
    });

    expect(container.querySelector('tbody')).toBeTruthy();
    expect(screen.getByText(/one/i)).toBeTruthy();
    expect(screen.getByText(/three/i)).toBeTruthy();
  });
});
