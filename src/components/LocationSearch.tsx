import { useState, useEffect, useRef } from 'react';
import { searchLocations, LocationResult } from '../services/weatherApi';
import { Coordinates } from '../types/weather';
import './LocationSearch.css';

interface LocationSearchProps {
  onLocationSelect: (coordinates: Coordinates, name: string) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        const locations = await searchLocations(query);
        setResults(locations);
        setShowResults(true);
        setLoading(false);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (location: LocationResult) => {
    const locationName = location.admin1
      ? `${location.name}, ${location.admin1}`
      : `${location.name}, ${location.country}`;

    onLocationSelect(
      { lat: location.latitude, lon: location.longitude },
      locationName
    );
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="location-search" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
        />
        {loading && <div className="search-spinner"></div>}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((location) => (
            <div
              key={location.id}
              className="search-result-item"
              onClick={() => handleSelectLocation(location)}
            >
              <span className="result-name">{location.name}</span>
              <span className="result-region">
                {location.admin1 && `${location.admin1}, `}{location.country}
              </span>
            </div>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !loading && (
        <div className="search-results">
          <div className="search-no-results">No locations found</div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
