import React ,{ useState , useEffect , useRef } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from "../../context/Context";
import {BiError  } from "react-icons/bi";
import rightGif from "../../images/right_gif.gif";
import { useUrlsContext } from "../../context/ContextApi";
// const USER_REGEX = /[\u0600-\u06FF]{4,29}$/;

const AddCategory = () => {
    const { setShowCategory , baseUrl  } = useStateContext();
    const { checkToken , checkTokenTwo } = useUrlsContext();


    const [category , setCategory] = useState("");
    const [showErrMsg , setShowErrMsg] = useState(false);

    const [showErrMsg2 , setShowErrMsg2] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const [showSucc , setShowSecc] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [loadingOnClickSubmit , setLoadingOnClickSubmit] = useState(false);
    useEffect( () => {
      checkToken();
      checkTokenTwo()
    })
    // useEffect( () => {
    //   const result = USER_REGEX.test( category.trim());
    //   setValidCategory(result);
    //   setShowErrMsg(!result)
      
    // } , [category])

    function addCategory(e) { 
      e.preventDefault();
  if (category.trim().length > 4){
    setLoadingOnClickSubmit(true)
    const nameCategory = {name : category}
      axios.post(`${baseUrl}category` , nameCategory , {
        headers : {
          accessToken : sessionStorage.getItem("accessToken") ,
        }
      })
      .then( (res) => {
        // console.log("successfully" , res);
        // console.log(res.data.message);
        setSuccessMsg(res.data.message)
        // setShowCategory(false);
        setCategory("");
        setShowSecc(true);
        setShowErrMsg2(false)
      })
      .catch( (err) => {
      //  console.log(err)
        setShowErrMsg2(true)
        setShowSecc(false)
        if (!err?.response) {
          setErrMsg("No Server Response");
        }
        else if (err.response.status === 401){
          checkTokenTwo()
        }
        else if (err.response?.status === 500){
          setErrMsg(err.data.message)
      }
        else {
          // console.log("Failed Add Category");
          setErrMsg("Failed Add Category");
        //  console.log(err)
        }
       
      })
    }
    else{
      setShowErrMsg(true)
      return;
    }
    }
  return (
    <div className="absolute top-0 right-0 bg-half-transparent w-full h-screen flex justify-center items-center z-10">
      <div className="bg-white p-8 h-[340px] w-[420px] flex justify-center items-center rounded-md shadow-sm border shadow-gray-100 relative">

        <div className=" absolute top-2 right-3 text-xl cursor-pointer p-2 shadow-sm rounded-md hover:bg-slate-50 hover:text-red-600"
         onClick={() => setShowCategory(false)}>
            <span><RxCross2 /></span>
        </div>
        {
            showSucc ?
            <div className="flex flex-col items-center justify-center gap-3">
              <div className=" w-36">
                <img src={rightGif}  />
              </div>
            <div className="p-2 text-second-blue text-sm w-full text-center rounded-md">
           
            <p>{successMsg}</p>
           </div>
           </div>
          :
          showErrMsg2 ?
        <div className="p-2 flex gap-2 flex-col items-center justify-center text-red-500 text-sm w-full text-center rounded-md">
           <span className="text-7xl"><BiError /></span>
            <p>{errMsg}</p>
        </div>
        : 
        
        <form className="flex flex-col items-center w-full gap-6 mt-4" onSubmit={addCategory}>
          
          <div className="w-full overflow-hidden">
            <label className="form-label font-semibold inline-block mb-2 text-second-blue">
              {/* Category Name */}
              الفئة
            </label>
            <input
              type="text"
              dir="auto"
              className={`form-control
                    block
                    w-full
                    px-3
                    py-[10px]
                    font-normal
                    text-gray-700
                    text-lg
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${ showErrMsg  && "focus:border-red-500  border-red-500" } `}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      if(category.trim().length < 4){
                        setShowErrMsg(true)
                      }
                      else{
                        setShowErrMsg(false)
                      }
                    }}
                    onFocus={() => {
                      if(category.trim().length < 4){
                        setShowErrMsg(true)
                      }
                      else{
                        setShowErrMsg(false)
                      }
                    }}
                    
                    
            />
            <p
            id="uidnote"
            className={
               showErrMsg   ? "text-red-500 text-xs block p-2 w-full overflow-hidden" : " opacity-0 offscreen p-1 w-full overflow-hidden"
            }
          >
           الحقل إجباري
          </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <input type="submit" value={`${loadingOnClickSubmit ? "LOADING..." : "Submit"}`} className={`p-3 mt-1 bg-second-blue cursor-pointer text-white text-sm hover:bg-third-blue  rounded-md w-full ${loadingOnClickSubmit ? "w-[50%]" : ""} duration-1000`} disabled={loadingOnClickSubmit}/>
          </div>
        </form>
}
      </div>
    </div>
  );
};

export default AddCategory;
