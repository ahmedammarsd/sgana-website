import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
 
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const LineCharts = () => {
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: '',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'Augest'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'ZAIN',
            data:[6,100 ,25 ,5 ,100 ,60 , 90 , 300],
            borderColor: '#01AAAB',
            backgroundColor: '#01AAAB',
          },
          {
            label: 'MTN',
            data: [6 , 40 , 50 , 500 , 600 ,100 , 79 , 70],
            borderColor: '#FFD833',
            backgroundColor: '#FFD833',
          },
          {
            label: 'SUDANI',
            data: [100 , 40 , 50 , 300 , 430 ,100 , 300 , 100],
            borderColor: '#C0D42F',
            backgroundColor: '#C0D42F',
          },
        ],
      };
      
  return (
    
        <Line options={options} data={data}/>
   
  )
}

export default LineCharts