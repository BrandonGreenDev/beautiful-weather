import { useEffect, useState } from 'react';
import { WeatherData } from './types/weather';
import { fetchWeatherData, getUserLocation } from './services/weatherApi';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's location
        const coordinates = await getUserLocation();

        // Fetch weather data
        const data = await fetchWeatherData(coordinates);
        setWeatherData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loader"></div>
          <p className="loading-text">Fetching your local weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {weatherData && <WeatherDashboard weatherData={weatherData} />}
    </div>
  );
}

export default App;
