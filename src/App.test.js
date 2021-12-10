import { render, screen } from '@testing-library/react';
import App from './App';
jest.mock("axios", () => () => Promise.resolve({ daily: []}));

describe('App', () => {
  let linkElement;

  beforeEach(() => {
    render(<App />);
    linkElement = screen.getByText(/Is it going to rain tomorrow?/i);
  })

  it('renders Is it going to rain tomorrow?', () => {
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Open Weather Link', () => {
    expect(linkElement.href).toBe('https://openweathermap.org/');
  });

});
