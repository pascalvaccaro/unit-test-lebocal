import { render } from '@testing-library/react';
import Weather from './Weather';

describe('Weather', () => {

  it('renders Is it going to rain tomorrow?', () => {
    const {container} = render(<Weather />);
    expect(container).not.toBeFalsy();
  });

  [
    { props: { sunny: true }, expected: "sun.svg"},
    { props: { raining: true }, expected: "rain.svg"},
    { props: { sunny: true, raining: true }, expected: "rainbow.svg"},
    { props: {}, expected: "logo.svg"},
  ].forEach(({ props, expected}) => {
    it(`a ${expected} is shown when it is ${Object.keys(props).join(" and ")}`, () => {
      const { getByAltText } = render(<Weather {...props} />);
      const image = getByAltText(/logo/i);
      expect(image.src).toEqual(`http://localhost/${expected}`)
    });
  });
});
