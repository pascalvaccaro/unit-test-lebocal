import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './components/Weather';
import { openWeather } from './utils/OpenWeather';
// 0. Axios must return something in the response
// 0. openWeather must return an object
// 1. Test with nothing
// 2. Test with data

function App({ lat, lon}) {
  const [data, setData] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    if(lat >= 0 && lon >= 0) {
      const url = new URL(process.env.REACT_APP_OWM_ONE_CALL, process.env.REACT_APP_OWM_API_HOST);
      url.searchParams.set('appid', process.env.REACT_APP_OWM_API_KEY);
      url.searchParams.set('lat', lat);
      url.searchParams.set('lon', lon);
      axios.get(url.toString())
        .then(res => res.data)
        .then(openWeather)
        .then(response => setData(response))
        .catch(err => setError(err));
    }
  }, [lat, lon]);

  return (
    <div className="App">
      <header className="App-header">
        {!error ? <Weather {...data} /> : null}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Is it going to rain tomorrow?
        </a>
        <button onClick={() => setData({ sunny: true })}>Sunny</button>
      </header>
    </div>
  );
}

export default App;
