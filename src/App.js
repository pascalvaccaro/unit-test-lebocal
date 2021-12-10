import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './components/Weather';
import { openWeather } from './utils/OpenWeather';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios("")
      .then(openWeather)
      .then(response => setData(response));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Weather />
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
      </header>
    </div>
  );
}

export default App;
