import React from 'react';

interface ResultsDisplayProps {
  result: {
    answer: string;
  } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-3">Results</h3>
        <div className="prose max-w-none">
          <p className="text-gray-700">{result.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;