import { openWeather } from "./OpenWeather";

describe('openWeather', () => {
  
    it('returns {} if there is no tomorow', () => {
        const fake = {daily: [{}]}
        const result = openWeather(fake);
        expect(result).toEqual({});
    });

    it('returns {} if there is no response', () => {
      const fake = null;
      const result = openWeather(fake);
      expect(result).toEqual({});
  });

    it('returns { raining: true } if description contains rain', () => {
        const fake = {daily: [{}, {
            weather: [
                {
                  description: "light rain",
                }
              ]
        }]}
        const result = openWeather(fake);
        expect(result).toEqual({ raining: true });
    });

    it('returns { sunny: true } if description contains clear sky', () => {
        const fake = {daily: [{}, {
            weather: [
                {
                  description: "clear sky",
                }
              ]
        }]}
        const result = openWeather(fake);
        expect(result).toEqual({ sunny: true });
    });

    it('returns { sunny: true, raining: true } if description contains clear sky and rain', () => {
        const fake = {daily: [{}, {
            weather: [
                {
                  description: "clear sky",
                },
                {
                    description: "rain",
                }
              ]
        }]}
        const result = openWeather(fake);
        expect(result).toEqual({ sunny: true, raining: true });
    });

    it('returns { } if description isnt rain or clear sky', () => {
        const fake = {daily: [{}, {
            weather: [
                {
                  description: "cloud",
                }
              ]
        }]}
        const result = openWeather(fake);
        expect(result).toEqual({ });
    });
  
});