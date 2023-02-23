import React from 'react';
import {  dataElectornic } from '../../data/data';
import LineCharts from './LineCharts';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
  
  const data = {
    labels: ['Zain', 'MTN', 'Sudani'],
    datasets: [
      {
        label: 'Users ',
        data: [dataElectornic[0].number, dataElectornic[1].number , dataElectornic[2].number],
        backgroundColor: [
          '#01AAAB',
          '#FFD833',
          '#C0D42F',
        ],
        borderColor: [
          'rgba(0,0,0,.3)',
          'rgba(0,0,0,.3)',
          'rgba(0,0,0,.3)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={`mt-[100px] m-2 md:m-10 p-2 md:p-10 bg-white`}>
       <div className="w-full grid grid-cols-3 gap-4 items-center ">
        {
          dataElectornic.map( (item , index) => (
            <div key={index} className={`flex flex-col items-center gap-5 p-5 shadow-md border-b-4 rounded-md
            ${item.company === "zain" ? " border-zain" : 
            item.company === "mtn" ? "border-two" : item.company === "sudani" ? "border-one" : ""}
             cursor-pointer hover:shadow-2xl duration-500`}>
              <div className="w-[100px] h-[100px] overflow-hidden">
                <img src={item.logo} className=" w-full h-full"/>
              </div>
              <div className="font-bold text-xl text-forth-blue t">
                {item.number}
              </div>
              <div className=" text-second-blue text-3xl">
                {item.icon}
                </div>
            </div>
          ))
        }
       </div>
       <div className=' w-full mt-10 shadow-md p-10 rounded-md border-b-2 border-second-blue'>
        <h2 className="text-second-blue text-xl font-semibold">المستخدمين</h2>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1'>
        <div className=' h-[300px] mt-3 w-full flex items-center justify-center shadow-md p-4 overflow-hidden'>
        <Doughnut data={data} />
        </div>
        <div className="mt-3 w-full h-[300px] shadow-md p-4 flex items-center justify-center">
        <LineCharts />
        </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard