import React from 'react';
import { useStateContext } from '../../context/Context';
import AddUser from './AddUser';
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineEditNote , MdOutlineDeleteSweep } from "react-icons/md";
import { mainContainer } from '../../data/data';
import { useUrlsContext } from '../../context/ContextApi';
import { useEffect } from 'react';

const Users = () => {
    const { showAddUser , setShowAddUser } = useStateContext();
    const { getAllUsers , deleteUser  , usersData , dataUsersLoading , dataUsersErrMsg , dataUsersErrMsgShow ,
      getOneUser  ,setStatusForUpdate } = useUrlsContext();

    useEffect( () => {
      getAllUsers();
     // console.log(usersData.length)
    } ,[])
  return (
    <div className={mainContainer}>

    {
        showAddUser && <AddUser />
    }

    <div className="flex justify-between items-center w-[25%] mt-2 mb-4">
        <div className="w-full">
            <button type="button" className="p-3 bg-second-blue text-white text-lg hover:bg-third-blue  rounded-md w-full flex items-center gap-3"
            onClick={ () =>{
              setStatusForUpdate(false)
              setTimeout(() => setShowAddUser(true) , 500 )
              }}
            >
                <span><IoPersonAddOutline /></span>
                {/* <span>Add User</span> */}
                إضافة مستخدم
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
          الإسم
          </th>
          <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
          اسم المستخدم
          </th>
          <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
          العمليات
          </th>             
        </tr>
      </thead>
      <tbody>
       { dataUsersLoading ?
      
      usersData.length == 0 ?    
      <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
         <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
           {/* No Users */}
           لم يتم اضافة مستخدم بعد
         </td>
         </tr> 
         :
        usersData.map( (item , index) => (
          <tr key={index}  className="bg-white border-b font-cairo hover:bg-blue-100 cursor-pointer transition-all duration-300 ease-linear">
           <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.name}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
          {item.username}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
           <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-second-blue hover:text-white cursor-pointer transition-all duration-300 ease-linear"
           onClick={async () => {
           await getOneUser(item.id)
          // setShowAddUser(true)
          setTimeout(() => setShowAddUser(true) , 500 )
           }}>
            <MdOutlineEditNote />
           </span>
           <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all duration-300 ease-linear" 
           onClick={() => { deleteUser(item.id)
           // console.log(item.id)
            }}>
            <MdOutlineDeleteSweep />
           </span>
          </td>
        </tr>
        ))
        :
        dataUsersErrMsgShow ?
             <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
              <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                { dataUsersErrMsg }
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

export default Users