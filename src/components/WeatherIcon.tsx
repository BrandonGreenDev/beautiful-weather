import './WeatherIcon.css';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const WeatherIcon = ({ condition, size = 48 }: WeatherIconProps) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon sun">
            <circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
            <g className="sun-rays">
              <line x1="12" y1="1" x2="12" y2="3" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round" />
            </g>
            <defs>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDB813" />
                <stop offset="100%" stopColor="#F37335" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'clouds':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon cloud">
            <path
              d="M18 10h-1.26A6 6 0 1 0 6 14h12a3 3 0 0 0 0-6Z"
              fill="url(#cloudGradient)"
              className="cloud-shape"
            />
            <defs>
              <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0E7FF" />
                <stop offset="100%" stopColor="#A5B4FC" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'rain':
      case 'drizzle':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon rain">
            <path d="M18 10h-1.26A6 6 0 1 0 6 14h12a3 3 0 0 0 0-6Z" fill="url(#rainCloudGradient)" />
            <g className="rain-drops">
              <line x1="8" y1="17" x2="8" y2="20" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12" y2="22" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="17" x2="16" y2="20" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
            </g>
            <defs>
              <linearGradient id="rainCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'thunderstorm':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon thunder">
            <path d="M18 10h-1.26A6 6 0 1 0 6 14h12a3 3 0 0 0 0-6Z" fill="url(#thunderGradient)" />
            <path
              d="M13 14l-3 5 3-2-1 4 4-6h-3l2-3"
              stroke="#FCD34D"
              strokeWidth="1.5"
              fill="#FCD34D"
              className="lightning"
            />
            <defs>
              <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'snow':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon snow">
            <path d="M18 10h-1.26A6 6 0 1 0 6 14h12a3 3 0 0 0 0-6Z" fill="url(#snowGradient)" />
            <g className="snowflakes">
              <circle cx="8" cy="18" r="1.5" fill="#E0F2FE" />
              <circle cx="12" cy="20" r="1.5" fill="#E0F2FE" />
              <circle cx="16" cy="18" r="1.5" fill="#E0F2FE" />
            </g>
            <defs>
              <linearGradient id="snowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0F9FF" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'mist':
      case 'fog':
      case 'haze':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon mist">
            <g className="mist-lines">
              <line x1="3" y1="7" x2="15" y2="7" stroke="#B8C5D6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="9" y1="7" x2="21" y2="7" stroke="#B8C5D6" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

              <line x1="3" y1="12" x2="21" y2="12" stroke="#D1D9E6" strokeWidth="2.5" strokeLinecap="round" />

              <line x1="3" y1="17" x2="15" y2="17" stroke="#B8C5D6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              <line x1="9" y1="17" x2="21" y2="17" stroke="#B8C5D6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            </g>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" className="weather-icon default">
            <circle cx="12" cy="12" r="10" fill="url(#defaultGradient)" />
            <defs>
              <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div className="weather-icon-container" style={{ width: size, height: size }}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
