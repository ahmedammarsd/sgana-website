import React from 'react'
import { useStateContext } from '../../context/Context';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Outlet} from 'react-router-dom';


const Main = () => {
    const { activeMenu} = useStateContext();

  return (
    <div>
         <div className="flex relative">
      {/* <div className="fixed right-4 bottom-4"  style={{zIndex: "1000"}}>
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl hover:bg-lightblue-logo text-blue-logo"
              style={{ borderRadius: "50%" }}
              onClick={() => setThemeSettings(true)}
            >
              <FiSettings />
            </button>
          </div> */}
          {activeMenu ? (
            <div className='w-72 fixed sidebar bg-white z-2'>
              <Sidebar />
            </div>
           ) :(
            <div className='w-0 bg-white '> 
              <Sidebar />
            </div>
           )}
            <div className={`dark:bg-main-dark-bg bg-main-bg main-h-screen w-full 
           ${activeMenu ? 'md:mr-72' : 'flex-2'}`}>
             <div className='fixed md:static bg-white dark:bg-main-dark-bg navbar w-full z-1'  >
              <Navbar />
             </div>
             <div>
              <Outlet />
             </div>
             </div>
      </div>
    </div>
  )
}

export default Main