import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('"Find trusted partners" text exist in dom', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Find trusted partners/i);
  expect(linkElement).toBeInTheDocument();
});
