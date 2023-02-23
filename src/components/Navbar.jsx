import React , {useEffect} from 'react';
import { useStateContext } from '../context/Context';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiUser } from "react-icons/bi"

const NavButton = ({ title , customFunc , icon  }) => (
    <button type="button" onClick={customFunc}  
    className=" text-xl rounded-lg p-3 hover:bg-second-blue text-second-blue shadow-sm hover:text-white transition-all duration-300 ease-linear">
        {icon}
    </button>
)

const Navbar = () => {
    const {  setActiveMenu , screenSize , setScreenSize  } = useStateContext();
    let nameUser = sessionStorage.getItem("name_user");

    useEffect( () => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize" , handleResize);
        handleResize();
        return () => window.removeEventListener("resize" , handleResize)
      } , [] );
   
  
      useEffect( () => {
        if (screenSize <= 900){
          setActiveMenu(false)
        }
        else{
          setActiveMenu(true)
        }
      } , [screenSize]);

  return (
    <div className="flex justify-between p-2 md:px-6 relative shadow-md bg-white border-b border-second-blue">
    <NavButton title="Menu" customFunc={ () => 
    setActiveMenu( (prevActiveMenu) => !prevActiveMenu) } icon={ <AiOutlineMenu /> } />
    
    <div className="flex items-center gap-2 cursor-pointer p-3 shadow-sm hover:bg-second-blue group hover:text-white rounded-lg px-5 transition-all duration-300 ease-linear">
             <span className=" text-blue-logo text-2xl -mt-1"> <BiUser className="text-blue-600 group-hover:text-white" /> </span>
           <p>
             
             <span className="text-blue-logo font-bold ml-1 text-14 text-second-blue group-hover:text-white">{nameUser === "" ? "No Name" : nameUser}</span>
           </p>
          </div>
 </div>
  )
}

export default Navbar