import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import { App } from '../shared/App';
import '@testing-library/jest-dom';

test('Testing tests', async () => {
  render(<App />);
  expect(await screen.findByText('eCommerce App')).toBeVisible();
});
