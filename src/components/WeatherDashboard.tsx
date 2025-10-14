import { WeatherData, Coordinates } from '../types/weather';
import ForecastCard from './ForecastCard';
import LocationSearch from './LocationSearch';
import './WeatherDashboard.css';

interface WeatherDashboardProps {
  weatherData: WeatherData | null;
  locationName: string;
  loading: boolean;
  error: string | null;
  onLocationSelect: (coordinates: Coordinates, name: string) => void;
}

const WeatherDashboard = ({
  weatherData,
  locationName,
  loading,
  error,
  onLocationSelect
}: WeatherDashboardProps) => {
  return (
    <div className="weather-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="title-gradient">7-Day</span> Weather Forecast
        </h1>
        {locationName && <p className="dashboard-subtitle">{locationName}</p>}
        <LocationSearch onLocationSelect={onLocationSelect} />
      </header>

      {loading && (
        <div className="dashboard-loading">
          <div className="loader"></div>
          <p className="loading-text">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="dashboard-error">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      )}

      {!loading && !error && weatherData && (
        <div className="forecast-grid">
          {weatherData.daily.slice(0, 7).map((forecast, index) => (
            <ForecastCard key={forecast.dt} forecast={forecast} index={index} />
          ))}
        </div>
      )}

      {!loading && !error && !weatherData && (
        <div className="dashboard-empty">
          <p className="empty-text">Search for a location to see the forecast</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
