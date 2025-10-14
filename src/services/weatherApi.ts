import { WeatherData, Coordinates, DailyForecast } from "../types/weather";

// Open-Meteo API - completely free, no API key required
const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_SEARCH_URL = "https://geocoding-api.open-meteo.com/v1/search";

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
}

// WMO Weather interpretation codes
const getWeatherCondition = (weatherCode: number): { main: string; description: string } => {
  if (weatherCode === 0) return { main: "Clear", description: "clear sky" };
  if (weatherCode <= 3) return { main: "Clouds", description: "partly cloudy" };
  if (weatherCode === 45 || weatherCode === 48) return { main: "Mist", description: "foggy" };
  if (weatherCode >= 51 && weatherCode <= 57) return { main: "Drizzle", description: "light drizzle" };
  if (weatherCode >= 61 && weatherCode <= 67) return { main: "Rain", description: "rainy" };
  if (weatherCode >= 71 && weatherCode <= 77) return { main: "Snow", description: "snowy" };
  if (weatherCode >= 80 && weatherCode <= 82) return { main: "Rain", description: "rain showers" };
  if (weatherCode >= 85 && weatherCode <= 86) return { main: "Snow", description: "snow showers" };
  if (weatherCode >= 95 && weatherCode <= 99) return { main: "Thunderstorm", description: "thunderstorm" };
  return { main: "Clear", description: "clear" };
};

export const fetchWeatherData = async (
  coordinates: Coordinates
): Promise<WeatherData> => {
  const { lat, lon } = coordinates;

  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&temperature_unit=fahrenheit&windspeed_unit=mph&forecast_days=7`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Weather API Error: ${response.status} ${response.statusText}`
      );
    }

    const data: any = await response.json();

    // Parse Open-Meteo response into our format
    const daily: DailyForecast[] = data.daily.time.map((time: string, index: number) => {
      const weatherCode = data.daily.weathercode[index];
      const condition = getWeatherCondition(weatherCode);
      const tempMax = data.daily.temperature_2m_max[index];
      const tempMin = data.daily.temperature_2m_min[index];
      const tempAvg = (tempMax + tempMin) / 2;

      return {
        dt: new Date(time).getTime() / 1000,
        sunrise: new Date(time).getTime() / 1000,
        sunset: new Date(time).getTime() / 1000,
        temp: {
          day: tempAvg,
          min: tempMin,
          max: tempMax,
          night: tempMin,
          eve: tempAvg,
          morn: tempAvg,
        },
        feels_like: {
          day: tempAvg,
          night: tempMin,
          eve: tempAvg,
          morn: tempAvg,
        },
        pressure: 1013, // Default value
        humidity: 50, // Default value
        weather: [
          {
            id: weatherCode,
            main: condition.main,
            description: condition.description,
            icon: "",
          },
        ],
        speed: data.daily.windspeed_10m_max[index],
        deg: data.daily.winddirection_10m_dominant[index],
        clouds: 0,
        pop: data.daily.precipitation_probability_max[index] / 100,
      };
    });

    return {
      lat,
      lon,
      timezone: data.timezone || "UTC",
      timezone_offset: 0,
      daily,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
    throw new Error("Failed to fetch weather data");
  }
};

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  const url = `${GEOCODING_SEARCH_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to search locations:", error);
    return [];
  }
};
