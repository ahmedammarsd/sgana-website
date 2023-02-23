import React, { useState, useRef, useMemo } from "react";
import { useStateContext } from "../../context/Context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RxCross2 } from "react-icons/rx";
import { useUrlsContext } from "../../context/ContextApi";
import rightGif from "../../images/right_gif.gif";
import { BiError } from "react-icons/bi";

const AddCompanies = () => {
  const {
    
    setShowAddCompanies,
    validCompany,
    msgErrNameCompany,
    
    showMsgErrCompany,
  
    validImage,
    msgErrImage,
    
    showMsgErrImage,
    
    validBody,
    msgErrBody,
    
    ShowMsgErrBody,
    
  } = useStateContext();
  const {
    addCompany,
    loadingAddCompane,
    successMsgAddCompany,
    showSuccessMsgAddCompany,
    errMsgAddCompany,
    showErrMsgAddCompany,
    setShowSuccessMsgAddCompany,
    setShowErrMsgAddCompany,
    setLoadingAddCompane,
  } = useUrlsContext();

  
  const [nameCompany, setNameCompany] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  
  const [imageSize, setImageSize] = useState(0);
  const [checkFindImage, setCheckFindImage] = useState("");
  const [typeImage, setTypeImage] = useState("");
  
  const addDataCompany = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company_name", nameCompany);
    formData.append("image", image);
    formData.append("body", body);
    // formData.append("create_by", 1);
    
    validCompany(nameCompany);
    validImage(checkFindImage, imageSize, typeImage);
    validBody(body);
    
    if (
      showMsgErrCompany !== true &&
      showMsgErrImage !== true &&
      ShowMsgErrBody !== true &&
      nameCompany != "" &&
      image != "" &&
      body != ""
      ) {
        addCompany(formData);
      }
    };

    return (
      <div className="absolute top-0 right-0 bg-half-transparent w-full h-screen flex justify-center items-center z-10">
      <div className="bg-white w-[80%] p-8 h-[800px] flex justify-center items-center rounded-md shadow-sm border shadow-gray-100 relative">
        <div
          className=" absolute top-2 right-3 text-xl cursor-pointer p-2 shadow-sm rounded-md hover:bg-slate-50 hover:text-red-600"
          onClick={() => {
            setShowAddCompanies(false);
            setShowSuccessMsgAddCompany(false);
            setShowErrMsgAddCompany(false);
            setLoadingAddCompane(false);
          }}
        >
          <span>
            <RxCross2 />
          </span>
        </div>
        {showSuccessMsgAddCompany ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className=" w-36">
              <img src={rightGif} />
            </div>
            <div className="p-2 text-second-blue text-sm w-full text-center rounded-md">
              <p>{successMsgAddCompany}</p>
            </div>
          </div>
        ) : showErrMsgAddCompany ? (
          <div className="p-2 flex gap-2 flex-col items-center justify-center text-red-500 text-sm w-full text-center rounded-md">
            <span className="text-7xl">
              <BiError />
            </span>
            <p>{errMsgAddCompany}</p>
          </div>
        ) : (
          <form
            className="flex w-[80%] overflow-auto flex-col items-center gap-6 mt-4"
            encType="multipart/form-data"
            onSubmit={addDataCompany}
          >
            <div className="w-full">
              <label className="form-label font-semibold inline-block mb-2 text-second-blue">
                اسم الشركة
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
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${
                      showMsgErrCompany &&
                      "focus:border-red-500  border-red-500"
                    }`}
                onChange={(e) => {
                  setNameCompany(e.target.value);
                  validCompany(e.target.value);
                }}
                onFocus={(e) => {
                  setNameCompany(e.target.value);
                  validCompany(e.target.value);
                }}
              />
              {
                <p
                  className={
                    showMsgErrCompany
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgErrNameCompany}
                </p>
              }
            </div>
            <div className="w-full">
              <label className="form-label font-semibold inline-block mb-2 text-second-blue">
               اختيار الشعار
              </label>
              <input
                type="file"
                id="formFile"
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
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    hover:file:cursor-pointer
                    hover:file:text-blue-500
                    focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none ${
                      showMsgErrImage && "focus:border-red-500  border-red-500"
                    }`}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // console.log(e.target.files.length , "all")
                  setCheckFindImage(e.target.files.length);
                  setImageSize(
                    `${e.target.files.length != 0 ? e.target.files[0].size : 0}`
                  );
                  setTypeImage(
                    `${
                      e.target.files.length != 0 ? e.target.files[0].type : ""
                    }`
                  );
                  // console.log(`${e.target.files.length != 0 ? e.target.files[0].type : ""}`);
                  //  console.log(e.target.files[0] , "all22");
                  validImage(
                    e.target.files.length,
                    `${
                      e.target.files.length != 0 ? e.target.files[0].size : 0
                    }`,
                    `${
                      e.target.files.length != 0 ? e.target.files[0].type : ""
                    }`
                  );
                }}
                onBlur={(e) => {
                  // console.log(e.target.files.length);
                  // console.log(e.target.files[0].size);
                  setImage(e.target.files[0]);
                  setCheckFindImage(e.target.files.length);
                  setImageSize(
                    `${e.target.files.length != 0 ? e.target.files[0].size : 0}`
                  );
                  setTypeImage(
                    `${
                      e.target.files.length != 0 ? e.target.files[0].type : ""
                    }`
                  );
                  validImage(
                    e.target.files.length,
                    `${
                      e.target.files.length != 0 ? e.target.files[0].size : 0
                    }`,
                    `${
                      e.target.files.length != 0 ? e.target.files[0].type : ""
                    }`
                  );
                }}
              />
              {
                <p
                  className={
                    showMsgErrImage
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgErrImage}
                </p>
              }
            </div>
            <div className="w-full">
              <label className="form-label font-semibold inline-block mb-2 text-second-blue">
                عن الشركة
              </label>
              <div className={`w-full h-[300px]`} dir="ltr">
                {/* <JoditEditor
                  ref={editor}
                  config={config}
                  //tabIndex={1} // tabIndex of textarea
                  onChange={(e) => {
                    validBody(e);
                  }}
                  onBlur={(newContent) => {
                    validBody(newContent);
                    setBody(newContent);
                  }} // preferred to use only this option to update the content for performance reasons
                  //onChange={newContent => {setContent(newContent)}}
                /> */}
                 <ReactQuill theme="snow"  
                 value={body}
                 onChange={(e) => {
                  validBody(e);
                  setBody(e);
                 }} 

                className={` h-[250px] w-full border-t 
                ${ ShowMsgErrBody ? " focus:border-red-500  border-red-500" : "border-transparent" }`}
                 />
              </div>
              {
                <p
                  className={
                    ShowMsgErrBody
                      ? "text-red-500 text-xs block p-1 w-full overflow-hidden"
                      : "opacity-0 text-xs p-1 w-full overflow-hidden"
                  }
                >
                  {msgErrBody}
                </p>
              }
            </div>
            <div className="w-full flex justify-center items-center">
              <input
                type="submit"
                value={`${loadingAddCompane ? "LOADING..." : "Submit"}`}
                className={`p-3 mt-1 bg-second-blue cursor-pointer text-white text-sm hover:bg-third-blue  rounded-md w-full ${
                  loadingAddCompane ? "w-[50%]" : ""
                } duration-1000`}
                // disabled={loadingAddCompane}
              />
            </div>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default AddCompanies;
