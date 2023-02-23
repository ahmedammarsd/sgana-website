import React, { useState } from 'react';
import { useStateContext } from '../../context/Context';
import { RxCross2 } from "react-icons/rx";
import { useUrlsContext } from '../../context/ContextApi';
import rightGif from "../../images/right_gif.gif";
import { BiError } from "react-icons/bi";





const AddUser = () => {
    const { setShowAddUser , validNameAddUser ,  msgNameUser , showMsgNameUser  ,
      validUserName , msgUserNameUser  , showMsgUserNameUser  ,
      validPassword ,msgPassword  , showMsgPassword 
    } = useStateContext();
    const {  addUsers , loadingAddUser , setLoadingAddUser , msgSuccessAddUser  , showSuccessMsgAddUser , setShowSuccessMsgAddUser , msgErrAddUser  , showErrMsgAddUser , setShowErrMsgAddUser
    ,updateDateUser ,statusForUpdate ,setStatusForUpdate , idUser , user , userNamee  } = useUrlsContext();

    const [name , setName ] = useState(statusForUpdate ? user : "" );
    const [userName ,setUserName] = useState(statusForUpdate ? userNamee : "");
    const [password , setPassword] = useState("");

    const dataUser = {
      name : name ,
      username : userName ,
      password : password
    }
    const dataUserUpdat = {
      name : name ,
      username : userName ,
    }
   
    const addUserr = (e) => {
      e.preventDefault();
      validNameAddUser(name);
      validUserName(userName);
    if (statusForUpdate === false){
      validPassword(password);
    }

    if (statusForUpdate === false && showMsgNameUser !== true && showMsgUserNameUser !== true && showMsgPassword !== true && name !== "" && userName !== "" && password !== ""){
            addUsers(dataUser)
    }
     if (statusForUpdate === true && showMsgNameUser !== true && showMsgUserNameUser !== true  && name !== "" && userName !== ""){
      updateDateUser(idUser , dataUserUpdat);
}
    }
  return (
    <div className="absolute top-0 right-0 bg-half-transparent w-full h-screen flex justify-center items-center z-10">
    <div className="bg-white p-8 h-[500px] w-[500px] flex justify-center items-center rounded-md shadow-sm border shadow-gray-100 relative">
    <div className=" absolute top-2 right-3 text-xl cursor-pointer p-2 shadow-sm rounded-md hover:bg-slate-50 hover:text-red-600"
     onClick={() => {
      setShowAddUser(false) ;
      setLoadingAddUser(false);
      setShowSuccessMsgAddUser(false);
      setShowErrMsgAddUser(false);
      setStatusForUpdate(false);
     }}
     >
        <span><RxCross2 /></span>
    </div>
    {showSuccessMsgAddUser ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className=" w-36">
              <img src={rightGif} />
            </div>
            <div className="p-2 text-second-blue text-sm w-full text-center rounded-md">
              <p>{msgSuccessAddUser}</p>
            </div>
          </div>
        ) : showErrMsgAddUser ? (
          <div className="p-2 flex gap-2 flex-col items-center justify-center text-red-500 text-sm w-full text-center rounded-md">
            <span className="text-7xl">
              <BiError />
            </span>
            <p>{msgErrAddUser}</p>
          </div>
        ) : (
    <form className="flex flex-col p-2 w-full items-center gap-6 mt-4" 
     onSubmit={addUserr}
    >
      <div className="w-full">
        <label className="form-label font-semibold inline-block mb-2 text-second-blue">
           الإسم
        </label>
        <input
          type="text"
          dir="auto"
          className={`form-control
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
                focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none
                ${showMsgNameUser && "focus:border-red-500  border-red-500" } `}
                value={name !== "" ? name : ""}
                onChange={(e) => {
                  setName(e.target.value);
                  validNameAddUser(e.target.value);
                  //console.log(e.target.value)
                }}
                onFocus={ (e) => {
                  validNameAddUser(e.target.value);
                }}
        />
         <p
                  className={
                    showMsgNameUser
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgNameUser}
                </p>
      </div>
      <div className="w-full">
        <label className="form-label font-semibold inline-block mb-2 text-second-blue">
          إسم المستخدم
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
                focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none
                ${showMsgUserNameUser && "focus:border-red-500  border-red-500" }`}
                 value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  validUserName(e.target.value);
                }}
                onFocus={(e) => {
                  validUserName(e.target.value);
                }}
        />
        <p
                  className={
                    showMsgUserNameUser
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgUserNameUser}
                </p>
      </div>
      <div className={`w-full ${statusForUpdate ? " hidden" : ""}`}>
        <label className="form-label font-semibold inline-block mb-2 text-second-blue">
         كلمة المرور
        </label>
        <input
          type="password"
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
                focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none
                ${showMsgPassword && statusForUpdate === false ? "focus:border-red-500  border-red-500" : ""}`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validPassword(e.target.value);
                }}
                onFocus={ (e) => {
                  validPassword(e.target.value);
                }}
        />
        <p
                  className={
                    showMsgPassword && statusForUpdate === false
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgPassword}
                </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <input type="submit"  value={`${loadingAddUser  ? "LOADING..." : "Submit"}`} className={`p-2 mt-5 bg-second-blue cursor-pointer text-white text-lg hover:bg-third-blue  rounded-md w-full ${
                  loadingAddUser  ? "w-[50%]" : ""
                } duration-1000`} disabled={loadingAddUser} />
      </div>
    </form>
        ) }
    </div>
</div>
  )
}

export default AddUser