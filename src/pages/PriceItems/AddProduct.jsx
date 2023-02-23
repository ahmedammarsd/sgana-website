import axios from 'axios';
import React , {useState , useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from '../../context/Context';
import { useUrlsContext } from '../../context/ContextApi';
import rightGif from "../../images/right_gif.gif";
import { BiError } from "react-icons/bi"

const AddProduct = () => {
    const { setShowProduct , baseUrl ,
      validSelect , msgErrSelect  , showErrSelect , setShowErrSelect ,
      validProduct,   msgErrProduct  , showMsgErrProduct , setShowMsgProduct ,
      validPrice, msgErrPrice  , showMsgErrPrice , setShowMsgPrice
    } = useStateContext();
    const { dataCateAndProd, Categories , dataCategory , checkToken } = useUrlsContext();
   

    const [category , setCategory] = useState("none");
    const [product , setProduct] = useState("");
    const [price , setPrice] = useState("");

    const [showMsgSuccess , setShowMsgSuccess] = useState(false);
    const [msgSuccess , setMsgSuccess] = useState("");

    const [showMsgErr , setShowMsgErr] = useState(false);
    const [msgErr , setMsgErr] = useState("");

    const [loadingOnClickSubmit , setLoadingOnClickSubmit] = useState(false);

    const dataProduct = {
      id_category : category,
      product_name : product,
      price : price,
      creat_by : 1,
    }

    useEffect( () => {
      Categories();
      setShowErrSelect(false);
      setShowMsgProduct(false);
      setShowMsgPrice(false);
      checkToken()
      //console.log(0.1 + 0.2);

    }, []);

  function addProduct(e) {
      e.preventDefault();
      validSelect(category);
      validProduct(product);
      validPrice(price);

      if(showErrSelect === false && showMsgErrProduct === false && showMsgErrPrice === false && category !== "none" && product !== "" && price !== "" ){
        setLoadingOnClickSubmit(true)
        axios.post(`${baseUrl}product` , dataProduct , {
          headers : {
            accessToken : sessionStorage.getItem("accessToken") ,
          }
        })
      .then( (res) => {
        // console.log("successfully" , res);
        // console.log(res.data.message);
        dataCateAndProd();
        // setShowProduct(false);
        setShowMsgSuccess(true);
        setShowMsgErr(false)
        setMsgSuccess(res.data.message);
      })
      .catch((err) => {
       // console.log(err , "errr");
        setShowMsgSuccess(false);
        setShowMsgErr(true);
        if (!err?.response) {
          setMsgErr("No Server Response");
        }
        else if (err.response?.status === 500){
          setMsgErr(err.data.message)
      }
        else {
          // console.log("Failed Add Category");
          setMsgErr("Failed Add Product");
          //console.log(err)
        }
      })
    }
    } 
   
  return (
    <div className="absolute top-0 right-0 bg-half-transparent w-full h-screen flex justify-center items-center z-10">
        <div className="bg-white p-8 h-[500px] w-[460px] flex justify-center items-center rounded-md shadow-sm border shadow-gray-100 relative">
        <div className=" absolute top-2 right-3 text-xl cursor-pointer p-2 shadow-sm rounded-md hover:bg-slate-50 hover:text-red-600"
         onClick={() => setShowProduct(false)}>
            <span><RxCross2 /></span>
        </div>
          {
            showMsgSuccess ?
            <div className="flex flex-col items-center justify-center gap-3">
            <div className=" w-36">
              <img src={rightGif}  />
            </div>
          <div className="p-2 text-second-blue text-sm w-full text-center rounded-md">
         
          <p>{msgSuccess}</p>
         </div>
         </div>
        :
        showMsgErr ?
      <div className="p-2 flex gap-2 flex-col items-center justify-center text-red-500 text-sm w-full text-center rounded-md">
         <span className="text-7xl"><BiError /></span>
          <p>{msgErr}</p>
      </div>
         : 
        <form className="flex flex-col w-full items-center gap-6 mt-4" onSubmit={addProduct}>
          <div className="w-full">
          <select  className={`form-select
                    block
                    w-full
                    px-3
                    py-[10px]
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${ showErrSelect  && "focus:border-red-500  border-red-500" }`}
                    defaultValue="none"
                    onChange={(e) => { 
                      //console.log(e.target.value)
                      setCategory(e.target.value);
                      validSelect(e.target.value);
                    } }
                    onFocus={() =>  validSelect(category)}
                    >
            <option value="none"> إختيار الفئة</option>
            {
              dataCategory.map( (item , index) => (
                <option key={index} value={item.id} >{item.name}</option>
              ))
            }
          </select>
          {
            <p
            className={
              showErrSelect ? "text-red-500 text-xs block p-1 w-full overflow-hidden" : "opacity-0 text-xs p-1 w-full overflow-hidden"
            }
          >
          {msgErrSelect }
          </p>
          }
          </div>
          <div className="w-full">
            <label className="form-label font-semibold inline-block mb-2 text-second-blue">
              {/* Product Name */}
               المادة
            </label>
            <input
              type="text"
              dir="auto"
              className={` form-control
                    block
                    w-full
                    px-3
                    py-[10px]
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${ showMsgErrProduct  && "focus:border-red-500  border-red-500" }`}
                    onChange={(e) => {
                      setProduct(e.target.value)
                      validProduct(e.target.value)
                    }
                    }
                    onFocus={() => validProduct(product)}
            />
            {
            <p
            className={
              showMsgErrProduct ? "text-red-500 text-xs block p-1 w-full overflow-hidden" : "opacity-0 text-xs  p-1 w-full overflow-hidden"
            }
          >
          {msgErrProduct }
          </p>
          }
          </div>
          <div className="w-full">
            <label className="form-label font-semibold inline-block mb-2 text-second-blue">
             {/* Price */}
             السعر
            </label>
            <input
              type="number"
              className={` form-control
                    block
                    w-full
                    px-3
                    py-[10px]
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${ showMsgErrPrice  && "focus:border-red-500  border-red-500" }`}
                    onChange={(e) => {
                      setPrice(e.target.value)
                      validPrice(e.target.value);
                    }}
                    onFocus={() => validPrice(price)}
            />
             {
            <p
            className={
              showMsgErrPrice ? "text-red-500 text-xs block p-1 w-full overflow-hidden" : "opacity-0 text-xs  p-1 w-full overflow-hidden"
            }
          >
          {msgErrPrice }
          </p>
          }
          </div>
          <div className="w-full flex justify-center items-center">
          <input type="submit" value={`${loadingOnClickSubmit ? "LOADING..." : "Submit"}`} className={`p-3 mt-1 bg-second-blue cursor-pointer text-white text-sm hover:bg-third-blue  rounded-md w-full ${loadingOnClickSubmit ? "w-[50%]" : ""} duration-1000`} disabled={loadingOnClickSubmit}/>
          </div>
        </form>
}
        </div>
    </div>
  )
}

export default AddProduct