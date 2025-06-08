import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DataVisualizationProps {
  data: any;
  type: 'bar' | 'line' | 'pie';
  title: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data, type, title }) => {
  if (!data || !data.labels || !data.datasets) {
    return <div className="text-center text-gray-500">No data available for visualization</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar options={options} data={data} />;
      case 'line':
        return <Line options={options} data={data} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      default:
        return <Bar options={options} data={data} />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="h-64">{renderChart()}</div>
    </div>
  );
};

export default DataVisualization;