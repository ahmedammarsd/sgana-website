import React , {useState , useEffect , Fragment } from 'react';
import { useStateContext } from '../../context/Context';
import { mainContainer } from '../../data/data';
import { MdOutlineEditNote , MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import logo from "../../images/logo.jpg";
import AddCompanies from './AddCompanies';
import { useUrlsContext } from '../../context/ContextApi';
import EditComanies from './EditComanies';



const Companies = () => {
    const { baseUrl ,showAddCompanies , setShowAddCompanies } = useStateContext();
    const { getCompaniesData ,companiesData , dataCompaniesLoading , dataCompaniesErrMsg , dataCompaniesErrMsgShow , updateLikeDeleteCompany ,
      getOneDataCompany , companyUpdate } = useUrlsContext();

      const [showDetails , setShowDetails] = useState(false);
      const [itemId , setItemId] = useState();

    useEffect( () => {
      getCompaniesData()
    }, [])
  return (
    <div className={mainContainer}>

        
          <div>
            { showAddCompanies && <AddCompanies />}
            {companyUpdate && <EditComanies /> }
            </div>


        <div className="flex justify-between items-center w-[25%] mt-2 mb-4">
            <div className="w-full">
                <button type="button" className="p-3 bg-second-blue text-white text-lg hover:bg-third-blue  rounded-md w-full flex items-center gap-3"
                onClick={() => setShowAddCompanies(true)}
                >
                    <span><AiOutlineAppstoreAdd /></span>
                    <span>إضافة شركة</span>
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
               الشعار
              </th>
              <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
                إسم الشركة
              </th>
              <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
              العمليات
              </th>             
            </tr>
          </thead>
          <tbody>

            { dataCompaniesLoading ?
              companiesData.length == 0 ?    
              <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
                 <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                   لم يتم اضافة شركة بعد
                 </td>
                 </tr> 
                 :
              companiesData.map( (item , index) => (
                <Fragment key={index}>
                  <tr className="bg-white border-b font-cairo hover:bg-blue-100 cursor-pointer transition-all duration-300 ease-linear"
                  >
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center">
              <div className='w-[60px] h-[60px] overflow-hidden rounded-full shadow-md'>
                    <img src={`${baseUrl}${item.image}`} className="w-full h-full object-cover" />
                </div> 
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  onClick={() => {
                    setShowDetails(!showDetails);
                    setItemId(item.id);
                  }}
                  >
                {item.company_name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
               <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-second-blue hover:text-white cursor-pointer transition-all duration-300 ease-linear"
               onClick={() => {
                getOneDataCompany(item.id)
               }}
               >
                <MdOutlineEditNote />
               </span>
               <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all duration-300 ease-linear"
                onClick={() => {
                  updateLikeDeleteCompany(item.id)
                }
                }
               >
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
                <div className='tc'  dangerouslySetInnerHTML={{__html: item.body}}></div>
              </td>
            </tr>
        }
                </Fragment>
              ))
              :
              dataCompaniesErrMsgShow ?
             <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
              <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                { dataCompaniesErrMsg }
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

export default Companies