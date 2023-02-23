import React, { Fragment, useState } from 'react'
import { useStateContext } from '../../context/Context';
import { mainContainer } from '../../data/data';
import { MdOutlineEditNote , MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import AddClubSoug from './AddClubSoug';
import { useUrlsContext } from '../../context/ContextApi';
import { useEffect } from 'react';
import EditClubSoug from './EditClubSoug';

const ClubSoug = () => {
    const { baseUrl , showAddClubSoug , setShowAddClubSoug } = useStateContext();
    const { getAllClub , deleteClub ,clubsData  , dataClubsLoading  , dataClubsErrMsg  , dataClubsErrMsgShow  ,
      getOneClub ,  showEditClub , setShowEditClub } 
    = useUrlsContext();

    const [showDetails , setShowDetails] = useState(false);
    const [itemId , setItemId] = useState();

    useEffect( () => {
      getAllClub();
    } , [])
  return (
    <div className={mainContainer}>

    {
        showAddClubSoug && <AddClubSoug />
    }
    {
      showEditClub &&  <EditClubSoug />
    }

    <div className="flex justify-between items-center w-[25%] mt-2 mb-4">
        <div className="w-full">
            <button type="button" className="p-3 bg-second-blue text-white text-lg hover:bg-third-blue  rounded-md w-full flex items-center gap-3"
            onClick={() => setShowAddClubSoug(true)}
            >
                <span><AiOutlineAppstoreAdd /></span>
                <span>إضافة ملتقى</span>
            </button>
        </div>
       
    </div>
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
  <div className="overflow-auto max-h-[500px] rounded-md">
    <table className="min-w-full text-center">
      <thead className="border-b bg-second-blue">
        <tr>
          <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
           الصورة
          </th>
          <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
           الملتقى
          </th>
          <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
          العمليات
          </th>             
        </tr>
      </thead>
      <tbody>
       {
        dataClubsLoading ?
      
        clubsData.length == 0 ?    
        <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
           <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
            لم يتم إضافة ملتقى بعد
           </td>
           </tr> 
           :
        clubsData.map( (item , index) => (
          <Fragment key={index} >
          <tr className="bg-white border-b font-cairo hover:bg-blue-100 cursor-pointer transition-all duration-300 ease-linear"
         
          >
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center">
          <div className='w-[60px] h-[60px] overflow-hidden rounded-full shadow-md'>
                <img src={`${baseUrl}${item.image}`} className="w-full h-full" />
            </div> 
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
           onClick={() => {
            setShowDetails(!showDetails);
            setItemId(item.id);
          }}
          >
            {item.club_name}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4"
          >
           <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-second-blue hover:text-white cursor-pointer transition-all duration-300 ease-linear"
            onClick={() => {
              getOneClub(item.id)
            }
              } >
            <MdOutlineEditNote />
           </span>
           <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all duration-300 ease-linear"
           onClick={() => {
            deleteClub(item.id);
           }}>
            <MdOutlineDeleteSweep />
           </span>
          </td>
        </tr>
        {
          showDetails == true && itemId == item.id &&
        <tr  className={`bg-white border-b font-cairo cursor-pointer transition-all ease-linear duration-500 `}>
              <td colSpan={3}
               className={`tc text-gray-900 ${showDetails == true && itemId == item.id ? "trClubShow py-4" : "trClubHidden py-0"} duration-1000`}
              
               >
                <div dangerouslySetInnerHTML={{__html: item.body}} className='tc text-gray-500'></div>
              </td>
            </tr>
        }
        </Fragment>
        
        ))
        :
        dataClubsErrMsgShow ?
             <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
              <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                { dataClubsErrMsg }
              </td>
              </tr> 
              :
              <tr className="bg-white border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
              <td colSpan="3" className="text-sm font-semibold text-gray-900 px-6 py-7 whitespace-nowrap">
                LODING...
              </td>
              </tr> 
       }
       
      </tbody>
    </table>
  </div>
</div>
</div>
</div>
  )
}

export default ClubSoug