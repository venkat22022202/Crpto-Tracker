import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function CryptoChart({ crypto }) {
  const data = {
    labels: ['24 Hours Ago', '18 Hours Ago', '12 Hours Ago', '6 Hours Ago', 'Now'],
    datasets: [
      {
        label: `${crypto.name} Price (Last 24 Hours)`,
        data: [crypto.price_24h_ago, crypto.price_18h_ago, crypto.price_12h_ago, crypto.price_6h_ago, crypto.current_price],
        fill: false,
        backgroundColor: 'rgb(33, 150, 243)', // Use a primary color for the dataset
        borderColor: 'rgba(33, 150, 243, 0.7)',
        pointBackgroundColor: 'rgba(33, 150, 243, 0.9)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(33, 150, 243, 0.8)',
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Place the legend at the top
        labels: {
          boxWidth: 12,
          color: 'rgb(60, 60, 60)', // Adjust the legend label color to match your theme
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        bodyColor: 'rgb(60, 60, 60)', // Tooltip text color
        titleColor: 'rgb(33, 150, 243)', // Tooltip title color to match the line color
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the gridlines for the x-axis
        },
        ticks: {
          color: 'rgb(80, 80, 80)', // Adjust the tick colors to match your theme
        },
      },
      y: {
        grid: {
          drawBorder: false, // Hide the border of the y-axis grid
          color: function(context) { // Use a function to change the gridline color based on the context
            if (context.tick.value > 0) {
              return 'rgba(0, 200, 5, 0.3)'; // Light green for positive values
            } else {
              return 'rgba(255, 0, 0, 0.3)'; // Light red for negative values
            }
          },
        },
        ticks: {
          color: 'rgb(80, 80, 80)', // Adjust the tick colors
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + value;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px', marginBottom: '20px' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default CryptoChart;
