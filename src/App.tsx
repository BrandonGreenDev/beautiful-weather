import { useState, useCallback } from 'react';
import { WeatherData, Coordinates } from './types/weather';
import { fetchWeatherData } from './services/weatherApi';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherForLocation = useCallback(async (coordinates: Coordinates, name: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWeatherData(coordinates);
      setWeatherData(data);
      setLocationName(name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app">
      <WeatherDashboard
        weatherData={weatherData}
        locationName={locationName}
        loading={loading}
        error={error}
        onLocationSelect={loadWeatherForLocation}
      />
    </div>
  );
}

export default App;
