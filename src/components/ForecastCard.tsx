import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import './ForecastCard.css';

interface ForecastCardProps {
  forecast: DailyForecast;
  index: number;
}

const ForecastCard = ({ forecast, index }: ForecastCardProps) => {
  const date = new Date(forecast.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayMonth = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const tempHigh = Math.round(forecast.temp.max);
  const tempLow = Math.round(forecast.temp.min);
  const condition = forecast.weather[0];

  return (
    <div className="forecast-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-inner">
        <div className="card-border"></div>
        <div className="card-content">
          <div className="card-date">
            <h3>{dayName}</h3>
            <p>{dayMonth}</p>
          </div>

          <WeatherIcon condition={condition.main} size={64} />

          <div className="card-condition">
            <p>{condition.main}</p>
            <span>{condition.description}</span>
          </div>

          <div className="card-temp">
            <div className="temp-high">
              <span className="temp-label">High</span>
              <span className="temp-value">{tempHigh}°</span>
            </div>
            <div className="temp-divider"></div>
            <div className="temp-low">
              <span className="temp-label">Low</span>
              <span className="temp-value">{tempLow}°</span>
            </div>
          </div>

          <div className="card-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <span>{forecast.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💨</span>
              <span>{Math.round(forecast.speed)} mph</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">☔</span>
              <span>{Math.round(forecast.pop * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
