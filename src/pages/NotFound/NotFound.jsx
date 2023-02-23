import React, { useEffect } from 'react';
import { useUrlsContext } from '../../context/ContextApi';

const NotFound = () => {
    const {logOut , checkTokenTwo} = useUrlsContext()
    useEffect( () => {
        //console.log("not Found");
        checkTokenTwo();
        logOut();
    })
  return (
    <div></div>
  )
}

export default NotFound