import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { linksDashboard } from "./data/data"
import ClubSoug from './pages/ClubSoug/ClubSoug';
import Companies from './pages/Companies/Companies';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import PriceItems from './pages/PriceItems/PriceItems';
import Users from './pages/Users/Users';
import { useUrlsContext } from './context/ContextApi';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

function App() {
const { checkToken , checkTokenTwo , authTokenSission } = useUrlsContext();

  useEffect( () => {
   // checkToken()
    checkTokenTwo();
  } , [])
  
  return (
    <div dir='rtl'>
     <Routes>
       <Route path='/dashboard' element={<Main />} >
         <Route path={linksDashboard[0].link} element={<Dashboard />} />
         <Route path={linksDashboard[1].link} element={<PriceItems />} />
         <Route path={linksDashboard[2].link} element={<Companies />} />
         <Route path={linksDashboard[3].link} element={<ClubSoug />} />
         <Route path={linksDashboard[4].link} element={<Users />} />
       </Route>
       <Route path='/login' element={<Login />} />
       <Route path='/' element={<Login />} />
       <Route path='*' element={<NotFound />} />
     </Routes>
    </div>
  );
}

export default App;
