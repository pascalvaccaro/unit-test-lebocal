export const openWeather = (res) => (res && res.daily[1] ? res.daily[1].weather : [])
  .reduce((acc, weather) => {
    if (weather.description === "clear sky") acc.sunny = true;
    if (weather.description.includes("rain")) acc.raining = true;
    return acc;
  }, {});