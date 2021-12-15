import { act, waitFor, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { worker } from './mocks/browser';
import axios from 'axios';
// Create a spy
import { openWeather } from './utils/OpenWeather';

jest.mock("axios");
// -> (load this mock instead of the real module)
jest.mock("./utils/OpenWeather");

describe('App', () => {
  let result;
  beforeEach(() => {
    act(() => { result = render(<App />); });
    // Fill the Axios spy with a mocked (dummy) implementation
    axios.get.mockResolvedValue(null);
    openWeather.mockReturnValue({ sunny: true });
  });
  
  afterEach(() => {
    openWeather.mockReset();
  });
  
  it('renders Is it going to rain tomorrow?', () => {
    const linkElement = screen.getByText(/Is it going to rain tomorrow?/i);
    return waitFor(() => expect(linkElement).toBeInTheDocument());
  });
  
  test('renders Open Weather Link', (done) => {
    const linkElement = screen.getByText(/Is it going to rain tomorrow?/i);
    waitFor(() => expect(linkElement.href).toBe('https://openweathermap.org/'))
      .then(done);
  });
  
  test('axios is invoked with the right parameters', async () => {
    await waitFor(() => {
      expect(axios.get).not.toHaveBeenCalled();
    });

    result.rerender(<App lat={0} lon={0} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/2.5/onecall?appid=ce090da8d558e94a550b538120d1f823&lat=0&lon=0"
      );
    });
  });

  describe.skip('Real API calls with Axios', () => {
    beforeEach(() => {
      axios.mockRestore();
      openWeather.mockRestore();
    });
    
    test('the openweather API is requested and it is raining', async () => {
      result.rerender(<App lat={0} lon={0} />);
      await waitFor(() => expect(screen.getByAltText(/logo/).src).toMatch(/rain\.svg$/));
    });
  
    test('the weather is not displayed when an error occurs', async () => {
      expect(screen.getByAltText(/logo/)).toBeInTheDocument();
      worker.use(
        rest.get("https://api.openweathermap.org/data/2.5/onecall", (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({ error: "No town found here"})
          );
        })
      );
      result.rerender(<App lat={0} lon={0} />);
      await waitFor(() => expect(screen.queryByAltText(/logo/)).toBe(null));
    });
  })

  describe('The cheat sunny button', () => {
    test('a button is present with the "Sunny" label', () => {
      const btnElement = screen.getByText(/Sunny/);
      expect(btnElement).toBeInTheDocument();
    });
    
    test('clicking the sunny button should set the Weather to sunny', async () => {
      const btnElement = result.getByText(/Sunny/);
      fireEvent.click(btnElement);
      const imgElement = screen.getByAltText(/logo/);
      expect(imgElement).toMatchSnapshot();
    });
  });

});
