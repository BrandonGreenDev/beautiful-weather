export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: Wind;
  pop: number;
  rain?: { '3h': number };
  snow?: { '3h': number };
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    timezone: number;
  };
}

export interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: WeatherCondition[];
  speed: number;
  deg: number;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyForecast[];
}

export interface LocationState {
  loading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
}

export interface WeatherState {
  loading: boolean;
  error: string | null;
  data: WeatherData | null;
}
