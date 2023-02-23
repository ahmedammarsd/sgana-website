import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../context/Context';
import { linksDashboard , activeLink , normalLink} from '../data/data';
import { IoLogoBuffer } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useUrlsContext } from '../context/ContextApi';


const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext(); 
    const { logOut } = useUrlsContext();
    const handleCloseSidebar = () => {
        if ( activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    }
  return (
    <div className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-md relative bg-white">
        {
            activeMenu && (
                <>
                 <div className="flex justify-between items-center bg-second-blue h-[200px] rounded-b-lg">
                    <Link to="/dashboard/main" className="flex justify-center text-white items-center gap-3 flex-1 mt-5 text-8xl font-extrabold tracking-tight">
                      <IoLogoBuffer />
                    </Link>
                    <button
                     type="button"
                     onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                     className="text-xl rounded-full text-white p-2 ml-1 text-orange-logo hover:bg-gray-50 hover:text-red-600 block md:hidden transition-all duration-300 ease-linear">
                        <MdOutlineCancel />
                     </button>
                 </div>
                 <div className="mt-10">
                    {
                        linksDashboard.map( (link , index) => (
                            <NavLink key={index} to={link.link} onClick={handleCloseSidebar} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                                <span className="text-xl">{link.icon}</span>
                                <span className="capitalize -ml-2">{link.name}</span>
                            </NavLink>
                        ))
                    }
                    <span className={`${normalLink} hover:cursor-pointer`} onClick={logOut}>
                        <span><MdLogout /></span>
                        <span>تسجيل خروج</span>
                    </span>
                 </div>
                </>
            )
        }

    </div>
  )
}

export default Sidebar