import React, { useEffect, useState } from 'react';
import imgLogin from "../../images/bg-image.jpg";
import { BiUser } from "react-icons/bi";
import { CgLock } from "react-icons/cg"
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/Context';
import { useUrlsContext } from '../../context/ContextApi';


const Login = () => {
  
   // let navgate = useNavigate();
    const { login , loadingLogin , errMsgLogin , showErrMsgLogin } = useUrlsContext();
    const {  validUserName , msgUserNameUser  , showMsgUserNameUser  ,
        validPassword ,msgPassword  , showMsgPassword  } = useStateContext();

    const [usernamee , setUsername] = useState("");
    const [ password , setPassword ] = useState("");

   
    const checkDataUser = async (e) => {
        e.preventDefault();
        const dataInput = {
            username : usernamee,
            password : password,
        }

        validUserName(usernamee);
        validPassword(password);

        if ( showMsgUserNameUser !== true && showMsgPassword !== true && usernamee != "" && password != ""){
        await login(dataInput);
        }
       
    }
   
  return (
    <div className="relative bg-login bg-cover bg-fixed w-full h-screen">
        <img src={imgLogin} loading="lazy" className="absolute top-0 right-0 -z-1 w-full h-full object-cover" />
        {/* <div className="log-clip absolute top-0 right-0 w-full h-full bg-main-blue">dfas</div> */}
        <div className="flex justify-center items-center h-full w-full">
        <div className="card h-[50%] w-[600px] relative rounded-md p-5 shadow-md border-b-4 border-second-blue">
                {
                    showErrMsgLogin &&
                    <div className=" absolute top-5 font-cairo right-0 text-lg text-red-500 w-full text-center pt-2">
                        {errMsgLogin}
                    </div>
                }
            <div className='w-full h-full flex justify-center items-center mt-3'>
                <form className="w-full flex flex-col gap-8 items-center" onSubmit={checkDataUser}>
                    <div className="w-[80%] relative">
                        <span className={`absolute top-11 text-xl right-2  ${showMsgUserNameUser == true ? "text-red-500" : "text-second-blue"}`}><BiUser /> </span>
                        <label className="form-label font-semibold inline-block mb-2 text-second-blue">إسم المستخدم</label>
                        <input type="text" 
                        className={`form-control
                        block
                        w-full
                        px-3
                        py-2
                        pr-8
                        text-base
                        font-normal
                        text-gray-700
                         bg-transparent
                        border-b
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-second-blue  focus:outline-none
                        ${showMsgUserNameUser == true ? "border-b border-red-500" : "border-second-blue"}`}
                        onChange={(e) => {
                          // console.log(e.target.value)
                            setUsername(e.target.value);
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
                    <div className="w-[80%] relative">
                    <span className={`absolute top-11 text-xl right-2  ${showMsgPassword == true ? "text-red-500" : "text-second-blue"}`}><CgLock /> </span>
                        <label className="form-label font-semibold inline-block mb-2 text-second-blue">كلمة المرور</label>
                        <input type="password"
                        className={`form-control
                        block
                        w-full
                        px-3
                        py-2
                        pr-8
                        text-base
                        font-normal
                        text-gray-700
                         bg-transparent
                        border-b
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-second-blue focus:outline-none
                        ${showMsgPassword == true ? "border-red-500" : "border-second-blue"}`}
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
                    showMsgPassword
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgPassword}
                </p>
                    </div>
                    <div className="w-[80%] flex justify-center items-center mt-8">
                        <input type="submit" 
                        value={`${loadingLogin ? "...LOADING" : "LOG-IN"}`}
                         className={`form-control
                         block
                         
                         px-3
                         py-3
                         text-base
                         font-normal
                         bg-none 
                         border border-solid border-second-blue
                         text-second-blue
                         rounded
                         duration-700
                         transition
                         ease-in-out
                          cursor-pointer
                          hover:bg-second-blue hover:text-white
                         m-0 ${loadingLogin ? "w-[50%]" : "w-full"}`}
                        disabled={loadingLogin}
                         />
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login