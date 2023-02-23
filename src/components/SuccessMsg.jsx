import React from 'react';
import { useStateContext } from '../context/Context';
import rightGif from "../images/right_gif.gif"
import { RxCross2 } from 'react-icons/rx';

const SuccessMsg = ({messageToShow}) => {
    const { setShowSuccessMsgAddCategory } = useStateContext()
  return (
    <div className="w-full h-full bg-half-transparent flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
        <div className=" absolute top-2 right-3 text-xl cursor-pointer p-2 shadow-sm rounded-md hover:bg-slate-50 hover:text-red-600"
         onClick={() => setShowSuccessMsgAddCategory(false)}>
            <span><RxCross2 /></span>
        </div>
            <div>
                <img src={rightGif} />
            </div>
            <div>
                {messageToShow}
            </div>
        </div>
    </div>
  )
}

export default SuccessMsg