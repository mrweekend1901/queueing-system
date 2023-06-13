import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
  // Dữ liệu và màu sắc cho các donut chart
  const data = [
    {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          data: [30, 50, 70],
          backgroundColor: ['#5185F7', '#6DDA6B', '#FFC542'],
        },
      ],
    },
    {
      labels: ['Label 4', 'Label 5', 'Label 6'],
      datasets: [
        {
          data: [45, 80, 60],
          backgroundColor: ['#FF6384', '#A463F2', '#FF9F40'],
        },
      ],
    },
  ];

  // Cấu hình tùy chọn cho các donut chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data[0]} options={options} />
    </div>
  );
};

export default DonutChart;
