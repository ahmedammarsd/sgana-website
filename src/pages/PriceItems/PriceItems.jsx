import React , {  useEffect  } from 'react';
import { mainContainer } from '../../data/data';
import { MdOutlineEditNote , MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useStateContext } from '../../context/Context';
import { useUrlsContext } from '../../context/ContextApi';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { Fragment } from 'react';


const PriceItems = () => {
    const { showCategory , setShowCategory , showProduct , setShowProduct } = useStateContext();
    const { productUpdate ,dataCateAndProd , categoryAndProducts , updateLikeDelete , updateDataProduct ,
      dataCategoryAndProductsLoading , dataCategoryAndProductsErrMsg , dataCategoryAndProductsErrMsgShow ,
      checkToken ,checkTokenTwo } = useUrlsContext();

    

    useEffect( () => {
      checkToken()
      checkTokenTwo()
      dataCateAndProd() 
    } , []);
    // window.addEventListener('offline', function(e) {
    //   console.log('offline'); });
      
    //   window.addEventListener('online', function(e) { console.log('online');
    //   });
  return (
    <div className={mainContainer}>

        <div>
            {showCategory && <AddCategory />}
            {showProduct && <AddProduct />}
            {productUpdate && <EditProduct />}
            
        </div>


        <div className="flex justify-between items-center gap-3 w-[50%] mt-2 mb-4">
            <div className="w-full">
                <button type="button" className="p-3 bg-second-blue text-white text-lg hover:bg-third-blue  rounded-md w-full flex items-center gap-3"
                onClick={() => setShowCategory(true)}
                >
                    <span><AiOutlineAppstoreAdd /></span>
                    {/* <span>Add Category</span> */}
                    <span> إضافة فئة</span>
                </button>
            </div>
            <div className="w-full">
               <button type="button" className="p-3 bg-second-blue text-white text-lg hover:bg-third-blue rounded-md w-full flex items-center gap-3"
                onClick={() => setShowProduct(true)}
                >
               <span><AiOutlineAppstoreAdd /></span>
                    {/* <span>Add Product</span> */}
                    <span>إضافة مادة</span>
               </button>
            </div>
        </div>
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-auto max-h-[500px] rounded-md">
        <table className="min-w-full text-center">
          <thead className="border-b bg-second-blue">
            <tr>
              <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
              {/* product */}
              المادة
              </th>
              <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
                {/* price */}
                السعر
              </th>
              <th scope="col" className="text-lg capitalize font-medium text-white px-6 py-5">
              {/* operations */}
              العمليات
              </th>             
            </tr>
          </thead>
          <tbody>
            { dataCategoryAndProductsLoading ?
              categoryAndProducts.length === 0 ?    
              <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
                 <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                   لم يتم إضافة مواد بعد
                 </td>
                 </tr> 
                 :
              categoryAndProducts.map( (item , index) => (
               <Fragment key={index}>
                <tr className="bg-gray-50 border-b border-second-blue font-cairo">
                <td colSpan="3" className="text-lg font-semibold  text-gray-900 px-6 py-4 whitespace-nowrap text-right ">
                 {item.name} 
                </td>
                </tr>
                {
                  item.Products.map( (item2 , index2) => (
                    <tr key={index2} className="bg-white border-b font-cairo hover:bg-blue-100 cursor-pointer transition-all duration-300 ease-linear">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {item2.product_name} 
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item2.price}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
                     <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-second-blue hover:text-white cursor-pointer transition-all duration-300 ease-linear"
                     onClick={ () => {
                      updateDataProduct(item2.id);
                      }}>
                      <MdOutlineEditNote />
                     </span>
                     <span className="text-2xl text-second-blue p-2 shadow-sm rounded-md hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all duration-300 ease-linear"
                     onClick={ () => updateLikeDelete(item2.id)} >
                      <MdOutlineDeleteSweep />
                     </span>
                    </td>
                  </tr>
                  ))
                }
               </Fragment>
              ))
              :
              dataCategoryAndProductsErrMsgShow ?
             <tr className="bg-white hover:bg-red-50 border-b font-cairo cursor-pointer transition-all duration-300 ease-linear">
              <td colSpan="3" className="text-sm font-semibold text-red-500 px-6 py-7 whitespace-nowrap">
                { dataCategoryAndProductsErrMsg }
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
    </div>
  )
}

export default PriceItems