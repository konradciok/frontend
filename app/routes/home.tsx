import type { Route } from "./+types/home";
import React, { useState } from 'react';
import FileUpload from '../../src/components/FileUpload';
import QueryInput from '../../src/components/QueryInput';
import ResultsDisplay from '../../src/components/ResultsDisplay';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketing Insights App" },
    { name: "description", content: "Analyze your marketing data with AI" },
  ];
}

export default function Home() {
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'query'>('upload');

  const handleUploadSuccess = (data: any) => {
    setUploadResult(data);
    setActiveTab('query');
  };

  const handleQueryResult = (result: any) => {
    setQueryResult(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Marketing Insights App</h1>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'upload'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Data
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'query'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('query')}
            disabled={!uploadResult}
          >
            Query Data
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Upload Your Marketing Data</h2>
            <p className="text-gray-600 mb-4">
              Upload a CSV file containing your marketing data. The data will be processed and stored for analysis.
            </p>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {uploadResult && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-medium mb-3">Upload Summary</h3>
              <p className="text-green-600 font-medium">{uploadResult.message}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Columns detected:</h4>
                <div className="flex flex-wrap gap-2">
                  {uploadResult.columns.map((column: string) => (
                    <span
                      key={column}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {column}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Query Your Marketing Data</h2>
            <p className="text-gray-600 mb-4">
              Ask questions about your marketing data in natural language.
            </p>
            <QueryInput onQueryResult={handleQueryResult} />
          </div>

          {queryResult && <ResultsDisplay result={queryResult} />}
        </div>
      )}
    </div>
  );
}
