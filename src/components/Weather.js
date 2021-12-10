import React, { useMemo } from 'react';
import sun from "./sun.svg";
import rain from "./rain.svg";
import rainbow from './rainbow.svg';
import logo from '../logo.svg';

function Weather({ raining, sunny }) {
  const src = useMemo(
    () => 
      raining && sunny 
        ? rainbow
        : sunny
        ? sun 
        : raining 
        ? rain 
        : logo,
    [raining, sunny]
  );
  return <img src={src} alt="logo" />;
}

export default Weather;
