/**
 * Team Directory Application
 * Main application component demonstrating React Hooks integration with ColdFusion REST API
 */
import { useState, useEffect, useCallback } from 'react';
import EmployeeCard from './components/EmployeeCard';
import SearchBar from './components/SearchBar';
import { fetchEmployees } from './services/employeeService';
import './App.css';

function App() {
  // State management using useState hook
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employees on component mount using useEffect hook
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load employees:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []); // Empty dependency array means this runs once on mount

  // Handle search with useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = employees.filter(employee =>
      employee.firstName.toLowerCase().includes(lowercaseQuery) ||
      employee.lastName.toLowerCase().includes(lowercaseQuery) ||
      employee.role.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredEmployees(filtered);
  }, [employees]);

  // Retry loading employees
  const handleRetry = () => {
    setError(null);
    setLoading(true);

    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h1 className="app-title">Team Directory</h1>
          </div>
          <p className="app-subtitle">
            ColdFusion REST API + React Integration
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">

          {/* Search Bar */}
          {!loading && !error && (
            <SearchBar onSearch={handleSearch} />
          )}

          {/* Loading State */}
          {loading && (
            <div className="state-container">
              <div className="loading-spinner"></div>
              <p className="state-message">Loading employees...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="state-container error-state">
              <div className="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="error-title">Failed to Load Employees</h3>
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={handleRetry}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Retry
              </button>
            </div>
          )}

          {/* Employee Grid */}
          {!loading && !error && (
            <>
              {filteredEmployees.length > 0 ? (
                <>
                  <div className="results-info">
                    <p>
                      Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees
                      {searchQuery && ` matching "${searchQuery}"`}
                    </p>
                  </div>
                  <div className="employee-grid">
                    {filteredEmployees.map((employee) => (
                      <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="state-container">
                  <div className="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <h3 className="empty-title">No Employees Found</h3>
                  <p className="empty-message">
                    {searchQuery
                      ? `No results found for "${searchQuery}". Try a different search term.`
                      : 'The employee directory is empty.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with <span className="heart">♥</span> using ColdFusion REST API & React
        </p>
        <p className="tech-stack">
          ColdFusion • React • Vite • SQLite
        </p>
      </footer>
    </div>
  );
}

export default App;
