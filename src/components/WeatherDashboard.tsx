import { WeatherData } from '../types/weather';
import ForecastCard from './ForecastCard';
import './WeatherDashboard.css';

interface WeatherDashboardProps {
  weatherData: WeatherData;
}

const WeatherDashboard = ({ weatherData }: WeatherDashboardProps) => {
  // Get 7 days of forecast
  const weekForecast = weatherData.daily.slice(0, 7);

  return (
    <div className="weather-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="title-gradient">7-Day</span> Weather Forecast
        </h1>
        <p className="dashboard-subtitle">Your local weather at a glance</p>
      </header>

      <div className="forecast-grid">
        {weekForecast.map((forecast, index) => (
          <ForecastCard key={forecast.dt} forecast={forecast} index={index} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
