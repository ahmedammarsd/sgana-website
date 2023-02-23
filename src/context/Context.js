import React , { createContext , useContext , useState} from "react";

const StateContext = createContext();

export const Context = ({children}) => {

    const [activeMenu , setActiveMenu] = useState(true);
    const [screenSize , setScreenSize] = useState(undefined);

    const [showCategory , setShowCategory] = useState(false);
    const [showProduct , setShowProduct ] = useState(false);
    const [showAddCompanies , setShowAddCompanies] = useState(false);
    const [showAddClubSoug , setShowAddClubSoug] = useState(false);
    const [showEditClub , setShowEditClub] = useState(false);
    const [ showAddUser , setShowAddUser] = useState(false);
    const [showEditProduct , setShowEditProduct] = useState(false);

    //const baseUrl = "http://localhost:4004/" ;
    const baseUrl = "http://dev.right-businesses.com/sgan_soug/";
    //const baseUrl = "https://8118-196-202-133-86.in.ngrok.io/";


    //============================== ADD PRODUCT =================================
    //const [selectCategory , setSelectCategory] = useState("");
    const [msgErrSelect , setMsgErrSelect] = useState("")
    const [showErrSelect , setShowErrSelect ] = useState(false);
    function validSelect(inputselect) {
        if (inputselect === "none"){
            setMsgErrSelect("Please Select The Category");
            setShowErrSelect(true);
        }
        else{
            return   setShowErrSelect(false);
        }
    } 

    const [ msgErrProduct , setMsgErrProduct] = useState("");
    const [ showMsgErrProduct , setShowMsgProduct] = useState(false);
    function validProduct(inputProduct) {
        if(inputProduct.trim().length < 4){
            setMsgErrProduct("The Field Is required");
            setShowMsgProduct(true)
          }
          else{
           return setShowMsgProduct(false)
          }
    }

    const [ msgErrPrice , setMsgErrPrice] = useState("");
    const [ showMsgErrPrice , setShowMsgPrice] = useState(false);
    function validPrice(inputPrice) {
        if(inputPrice.trim().length < 2){
            setMsgErrPrice("The Field Is required");
            setShowMsgPrice(true)
          }
          else{
            return  setShowMsgPrice(false)
          }
    }


    //============================================================================


    //============================== ADD COMPANY ======================================
    const [msgErrNameCompany , setMsgErrNameCompany] =useState("");
    const [ showMsgErrCompany , setShowMsgCompany] = useState(false);
    function validCompany(inputCompany) {
        if(inputCompany.trim().length < 4){
            setMsgErrNameCompany("The Field Is required");
           return  setShowMsgCompany(true)
          }
          else{
           return setShowMsgCompany(false)
          }
    }

    const [msgErrImage , setMsgImage] = useState("");
    const [showMsgErrImage , setShowMsgErrImage] = useState(false);

    function validImage(inputImage , size , type) {
        if(inputImage  === 0){
            setMsgImage("The Field Is required");
           return  setShowMsgErrImage(true)
          }
        if (inputImage  !== 0){
         if (size > 2000000){
            setMsgImage("Max Size 2 MB");
           return  setShowMsgErrImage(true)
          }
        else if (type === "image/jpeg" || type === "image/jpg" || type === "image/png" ){
            return setShowMsgErrImage(false)
          }
          else{
            
            setMsgImage("Sorry , Unsupported File");
            return  setShowMsgErrImage(true)
           }
        }
        else{
            return setShowMsgErrImage(false)
           }
    }

    const [ msgErrBody , setMsgErrBody ] = useState("")
    const [ ShowMsgErrBody , setShowMsgErrBody ] = useState(false);

    function validBody(body) {
        if(body.length === 0){
            setMsgErrBody("The Body Is required");
           return  setShowMsgErrBody(true)
          }
          else if (body.length < 100) {
            setMsgErrBody("Minimum 100 Words");
           return  setShowMsgErrBody(true)
          }
          else if (body.length > 2000) {
            setMsgErrBody("Maximum 2000 Words");
           return  setShowMsgErrBody(true)
          }
          else{
           return setShowMsgErrBody(false)
          }
    }
    //==================================================================================



    //======================================= ADD USER =================================


    // NAME
    const [msgNameUser , setMsgNameUser] = useState("");
    const [showMsgNameUser , setShowMsgNameUser] = useState(false);
    const checkInput = /^[0-9]/;

    const validNameAddUser = (input ) => {
       if (input.trim().length === 0){
        setMsgNameUser("The Name Is required");
        return  setShowMsgNameUser(true)
       }
       else if ( input.trim().length < 5){
        setMsgNameUser("The Name Is Not Valid");
        return  setShowMsgNameUser(true)
       }
       else if (checkInput.test(input)) {
        setMsgNameUser("The Name Can't Start With Number ");
        return  setShowMsgNameUser(true)
      }
       else {
        setShowMsgNameUser(false);
       }

    }

    // USERNAME
    const [msgUserNameUser , setMsgUserNameUser] = useState("");
    const [showMsgUserNameUser , setShowMsgUserNameUser] = useState(false);
    const REGX_USERNAME = /^[a-zA-Z\-]{5,15}$/;
    const msgUsername = "The Username Is Not Valid. Only Characters A-Z, a-z And '-' are  Acceptable.";

    const validUserName = (input) => {
        if (input.trim().length === 0){
            setMsgUserNameUser("The Username Is required");
            return  setShowMsgUserNameUser(true)
           }
        // else if (input.trim().length < 3){
        //     setMsgUserNameUser("The Username Is Not Valid");
        //     return  setShowMsgUserNameUser(true)
        // }   
         else if (REGX_USERNAME.test(input) === false){
            setMsgUserNameUser(msgUsername);
            return  setShowMsgUserNameUser(true)
         }  
         else {
            setShowMsgUserNameUser(false)
         }
    }


    // PASSWORD
    const [msgPassword , setMsgPasseord] = useState("");
    const [showMsgPassword , setShowMsgPassword] = useState(false);
    const REGX_PASSWORD = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const msgPasswordRegx = "password should contain atleast one number and one special character"

    const validPassword = (input) => {
        if (input.trim().length === 0){
            setMsgPasseord("The Password Is required");
            return  setShowMsgPassword(true)
           }
           else if (REGX_PASSWORD.test(input) === false){
            setMsgPasseord(msgPasswordRegx);
            return  setShowMsgPassword(true)
         }    
         else {
            setShowMsgPassword(false);
         }
    }


    //==================================================================================
    return (
        <StateContext.Provider value={{
            activeMenu , setActiveMenu , screenSize , setScreenSize ,
            showCategory , setShowCategory ,
            showProduct , setShowProduct ,
            showAddCompanies , setShowAddCompanies ,
            showAddClubSoug , setShowAddClubSoug ,
            showAddUser , setShowAddUser ,
            showEditProduct , setShowEditProduct ,
            baseUrl,
            validSelect , msgErrSelect , setMsgErrSelect , showErrSelect , setShowErrSelect ,
            validProduct, msgErrProduct , setMsgErrProduct , showMsgErrProduct , setShowMsgProduct ,
            validPrice, msgErrPrice , setMsgErrPrice , showMsgErrPrice , setShowMsgPrice ,
            validCompany ,msgErrNameCompany , setMsgErrNameCompany , showMsgErrCompany , setShowMsgCompany ,
            validImage ,msgErrImage , setMsgImage , showMsgErrImage , setShowMsgErrImage ,
            validBody ,msgErrBody , setMsgErrBody , ShowMsgErrBody , setShowMsgErrBody ,
            validNameAddUser ,msgNameUser , setMsgNameUser , showMsgNameUser , setShowMsgNameUser ,
            validUserName , msgUserNameUser , setMsgUserNameUser , showMsgUserNameUser , setShowMsgUserNameUser ,
            validPassword ,msgPassword , setMsgPasseord , showMsgPassword , setShowMsgPassword ,
            showEditClub , setShowEditClub
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)