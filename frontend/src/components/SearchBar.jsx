/**
 * SearchBar Component
 * Provides search functionality for filtering employees
 */
import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search by name or role..." }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search to avoid excessive API calls
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(searchTerm);
        }, 300); // 300ms delay

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, onSearch]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleChange}
                    aria-label="Search employees"
                />
                {searchTerm && (
                    <button
                        className="clear-button"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
