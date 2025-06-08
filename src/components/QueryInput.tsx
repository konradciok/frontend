import React, { useState } from 'react';
import axios from 'axios';

interface QueryInputProps {
  onQueryResult: (result: any) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${backendUrl}/query`, {
        question: query,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        onQueryResult(response.data);
      }
    } catch (err: any) {
      console.error('Query error:', err);
      if (err.message === 'Network Error') {
        setError('Cannot connect to the server. Please make sure the backend is running at http://localhost:8000');
      } else {
        setError(`Error processing query: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="query" className="text-sm font-medium text-gray-700 mb-1">
            Ask a question about your marketing data
          </label>
          <div className="flex">
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What was our highest performing campaign last month?"
              className="flex-1 rounded-l-md border border-gray-200 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Ask'}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}
      </form>
    </div>
  );
};

export default QueryInput;