import React , { createContext , useContext , useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UrlsContext = createContext();
//const baseUrl = "http://localhost:4004/" ;
const baseUrl = "http://dev.right-businesses.com/sgan_soug/";
//const baseUrl = "https://8118-196-202-133-86.in.ngrok.io/";


export const ContextApi = ({children}) => {

   let authTokenSission =  sessionStorage.getItem("accessToken");


    const [categoryAndProducts , setCategoryAndProducts] = useState([]);
    const [dataCategoryAndProductsLoading , setDataCategoryAndProductsLoading ] = useState(false);
    const [dataCategoryAndProductsErrMsg , setDataCategoryAndProductsErrMsg] = useState("");
    const [dataCategoryAndProductsErrMsgShow , setDataCategoryAndProductsErrMsgShow] = useState(false);

    const [dataCategory , setDataCategory] = useState([]);
    //const [dataCategoryLoading , setDataCategoryLoading ] = useState(false);

    const [productUpdate , setProductUpdate ] = useState(false);
    const [idProductForUpdate , setIdProductForUpdate ] = useState();
    const [idCategoryForUpdate , setIdCategoryForUpdate] = useState();
    const [productNameForUpdate ,setProductNameForUpdate] = useState("");
    const [priceForUpdate , setPriceForUpdate] = useState();


    // const printConsole = () => {
    //     console.log("Context Two");
    // }

    //=============================operation Category ==============================
    const Categories = () => {
        axios.get(`${baseUrl}category`)
      .then( (respnse) => {
        setDataCategory(respnse.data.result)
      })
    }

    const dataCateAndProd = () => {
        axios.get(`${baseUrl}category/category-products`)
        .then( (response) => {
         // console.log(response.data.result);
          setCategoryAndProducts(response.data.result);
          setDataCategoryAndProductsLoading(true)
        } )
        .catch( (err) => {
          setDataCategoryAndProductsLoading(false)
          setDataCategoryAndProductsErrMsgShow(true);
          if (!err?.response) {
            setDataCategoryAndProductsErrMsg("No Server Response");
          }
          else {
            // console.log("Failed Add Category");
            setDataCategoryAndProductsErrMsg("Sorry , Check Internet");
          }
         
        })
      }
    //===============================================================================
    //============================= Opreation Products================
      const updateLikeDelete = (id) => {
        axios.patch(`${baseUrl}product/delete/${id}` , {isDelete : 1} ,
        {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (result) => {
       //   console.log(result.data.message);
          dataCateAndProd()  
        })
        .catch( (err) => {
        //  console.log(err.data.message);
        if (err.response.status === 401){
          navigatee("/login");
        }
        })
      }

      const updateDataProduct = (id) => {
        axios.get(`${baseUrl}product/${id}` ,
        {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (result) => {
        //  console.log(result.data);
          setIdProductForUpdate(result.data.id);
          setIdCategoryForUpdate(result.data.id_category);
          setProductNameForUpdate(result.data.product_name);
          setPriceForUpdate(result.data.price);
          setProductUpdate(true);
        })
        .catch( (err) => {
         // console.log(err.data.message);
         if (err.response.status === 401){
          navigatee("/login");
        }
        })
      }

       //=============================================

       ///============================ Opreation Companies ==============================


          //ADD
       const [successMsgAddCompany , setSuccessMsgAddCompany ] = useState("");
       const [showSuccessMsgAddCompany , setShowSuccessMsgAddCompany ] = useState(false)

       const [errMsgAddCompany , setErrMsgAddCompany ] = useState("");
       const [showErrMsgAddCompany , setShowErrMsgAddCompany ] = useState(false);

       const [loadingAddCompane , setLoadingAddCompane] = useState(false);
       function addCompany(dataToAdd) {
        setLoadingAddCompane(true)
        axios.post(`${baseUrl}companies` , dataToAdd , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
         // console.log(res);
          setShowSuccessMsgAddCompany(true);
          setShowErrMsgAddCompany(false)
          setSuccessMsgAddCompany(res.data.message); 
          getCompaniesData()
        })
        .catch( (err) => {
         // console.log(err);
          // console.log(err.respnse.status === 500 ? "bad res" : "") 
          setShowErrMsgAddCompany(true)
          setShowSuccessMsgAddCompany(false);
          if (!err?.response) {
            setErrMsgAddCompany("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response?.status === 500){
            setErrMsgAddCompany(err.data.message)
        }
          else {
            setErrMsgAddCompany("Failed Add Information Company");
          }
        })
       }


       //SELECT ALL

       const [companiesData , setCompaniesData] = useState([]);
       const [dataCompaniesLoading , setDataCompaniesLoading ] = useState(false);
       const [dataCompaniesErrMsg , setDataCompaniesErrMsg] = useState("");
       const [dataCompaniesErrMsgShow , setDataCompaniesErrMsgShow] = useState(false);


       const getCompaniesData = () => {
         axios.get(`${baseUrl}companies`)
         .then( (res) => {
           //console.log(res.data);
           setCompaniesData(res.data.result);
           setDataCompaniesLoading(true);
        })
        .catch( (err) => {
          //console.log(err)
          setDataCompaniesLoading(false);
          setDataCompaniesErrMsgShow(true)
          if (!err?.response) {
            setDataCompaniesErrMsg("No Server Response");
          }
          else {
            // console.log("Failed Add Category");
            setDataCompaniesErrMsg("Sorry , Can Not Get Data Companies");
          }
        })
       }

       const updateLikeDeleteCompany = (id) => {
        axios.patch(`${baseUrl}companies/delete/${id}` , {isDelete : 1} ,
         {
          headers : {
            accessToken : authTokenSission
          }
         } )
        .then( (result) => {
          //console.log(result.data.message);
          getCompaniesData();
        })
        .catch( (err) => {
         // console.log(err.data.message);
         if (err.response.status === 401){
          navigatee("/login");
        }
        })
      }


      //GET ON COMPANY FOR UPDATE


      const [companyUpdate , setCompanyUpdate] = useState(false)
      const [companyIdForUpdate , setCompanyIdForUpdate] = useState(0)
      const [conmpanyNameForUpdate , setCompanyNameForUpdate] = useState("");
      const [logoCompanyForUpdate , setLogoCompanyForUpdate] = useState("");
      const [bodyCompanyForUpdate  , setBodyCompanyForUpdate] = useState("");
      const [updateCompanyLoading , setUpdateCompanyLoading] = useState(false)
      const getOneDataCompany = (id) => {
       
        axios.get(`${baseUrl}companies/info-company/${id}` , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (result) => {
          //console.log(result.data);
          setCompanyIdForUpdate(result.data.id);
          setCompanyNameForUpdate(result.data.company_name);
          setLogoCompanyForUpdate(result.data.image);
          setBodyCompanyForUpdate(result.data.body);
          setCompanyUpdate(true);
        })
        .catch( (err) => {
          //console.log(err.data.message , "dasflk");
        })
      }

      
      // UPDATE 
      const updateDataCompany = (id , dataCompany , statusImageOrNot , oldImage) => {
        setLoadingAddCompane(true)
        axios.patch(`${baseUrl}companies/${id}/${statusImageOrNot}/${oldImage}` , dataCompany , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
         // console.log(res.data.message);
         setShowSuccessMsgAddCompany(true);
         setShowErrMsgAddCompany(false)
         // setCompanyUpdate(false);
          setSuccessMsgAddCompany(res.data.message); 
          getCompaniesData();
        })
        .catch( (err) => {
          //console.log(err)
          setShowErrMsgAddCompany(true)
          setShowSuccessMsgAddCompany(false);
          if (!err?.response) {
            setErrMsgAddCompany("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response?.status === 500){
            setErrMsgAddCompany(err.data.response.message)
        }
          else {
            setErrMsgAddCompany("Failed Update Information Company");
          }
        })
      }
       
       //===========================================================================

       //============================== OPERATION USER =============================

       // ADD (INSERT) 
       const [loadingAddUser , setLoadingAddUser] = useState(false);

       const [msgSuccessAddUser , setMsgSuccessAddUser] = useState("")
       const [showSuccessMsgAddUser , setShowSuccessMsgAddUser] = useState(false)

       const [msgErrAddUser , setMsgErrAddUser] = useState("")
       const [showErrMsgAddUser , setShowErrMsgAddUser] = useState(false);
       const addUsers = (dataUser) => {
        setLoadingAddUser(true);
        axios.post(`${baseUrl}user` , dataUser , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (result) => {
          // console.log("add Successfully");
          setShowSuccessMsgAddUser(true);
          setMsgSuccessAddUser(result.data.message);
          getAllUsers()
        })
        .catch( (err) => {
          // console.log(err , "Sorry, Error ");
          setShowErrMsgAddUser(true);
          if (!err?.response) {
            setMsgErrAddUser("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response.status === 409){
            setMsgErrAddUser(err.response.data.message);
        }
          else if (err.response?.status === 500){
            setMsgErrAddUser(err.data.message);
        }
          else {
            setMsgErrAddUser("Failed Add Information User");
          }
        })
       }

       // GET ALL (SELECT ALL)

       const [usersData , setUsersData] = useState([]);
       const [dataUsersLoading , setDataUsersLoading ] = useState(false);
       const [dataUsersErrMsg , setDataUsersErrMsg] = useState("");
       const [dataUsersErrMsgShow , setDataUsersErrMsgShow] = useState(false);

       const getAllUsers = () => {
        axios.get(`${baseUrl}user` , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
         // console.log(res);
          setUsersData(res.data);
          setDataUsersLoading(true);
        })
        .catch( (err) => {
          //console.log(err);
          setDataUsersLoading(false);
          setDataUsersErrMsgShow(true);
        //  console.log(err)
          if (!err?.response) {
            setDataUsersErrMsg("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else {
            // console.log("Failed Add Category");
            setDataUsersErrMsg("Sorry , Can Not View The Users");
          }
        })
       }

       const [statusForUpdate ,setStatusForUpdate] = useState(false); 
       //UPDATE 
       const updateDateUser = (id , dataUser) => {
         setLoadingAddUser(true)
        axios.patch(`${baseUrl}user/${id}` , dataUser , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
          //console.log("Update Successfully");
          setShowSuccessMsgAddUser(true);
          setMsgSuccessAddUser(res.data.message);
          getAllUsers()
        })
        .catch( (err) => {
        //  console.log(err);
          setShowErrMsgAddUser(true);
        
         // console.log(err);
          if (!err?.response) {
            setMsgErrAddUser("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response.status === 409){
            setMsgErrAddUser(err.response.data.message);
        }
          else if (err.response?.status === 500){
            setMsgErrAddUser(err.response.data.message);
        }
          else {
            setMsgErrAddUser("Failed Add Information User");
          }
        })
       }

       // GET ONE USER
       const [idUser , setIdUser] = useState();
       const [user , setUser] = useState("");
       const [userNamee , setUserNamee] = useState("")
       const getOneUser = (id) => {
        axios.get(`${baseUrl}user/${id}` , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
          //console.log(res);
          setIdUser(res.data.id);
          setUser(res.data.name);
          setUserNamee(res.data.username);
          setStatusForUpdate(true);
        })
        .catch( (err) => {
         // console.log(err);
         if (err.response.status === 401){
          navigatee("/login");
        }
        })
       }

       // DELETE
       const deleteUser = (id) => {
        axios.patch(`${baseUrl}user/delete/${id}` , {isDelete : 1}
        , 
        {
          headers : {
            accessToken : authTokenSission
          }
        }
        )
        .then( (res) => {
          getAllUsers();
          // console.log("Successfully Delete User");
          // console.log(res)
        })
        .catch( (err) => {
         // console.log(err);
         if (err.response.status === 401){
          navigatee("/login");
        }
        })
       }

       //===========================================================================

       //============================= OPERATION CLUB ==============================
       
       // GET ALL
       const [clubsData , setClubsData] = useState([]);
       const [dataClubsLoading , setDataClubsLoading ] = useState(false);
       const [dataClubsErrMsg , setDataClubsErrMsg] = useState("");
       const [dataClubsErrMsgShow , setDataClubsErrMsgShow] = useState(false);
       const getAllClub = async () => {
        await axios.get(`${baseUrl}club`)
        .then( (res) => {
         // console.log(res);
          setClubsData(res.data.result);
          setDataClubsLoading(true);
        })
        .catch( (err) => {
         // console.log(err);
          if (!err?.response) {
            setDataClubsErrMsg("No Server Response");
          }
          
          else {
            // console.log("Failed Add Category");
            setDataClubsErrMsg("Sorry , Check Internet");
          }
        })
       }

       //ADD
       const [loadingAddClub , setLoadingAddClub] = useState(false);

       const [msgSuccessAddClub , setMsgSuccessAddClub] = useState("")
       const [showSuccessMsgAddClub , setShowSuccessMsgAddClub] = useState(false)

       const [msgErrAddClub , setMsgErrAddClub] = useState("")
       const [showErrMsgAddClub , setShowErrMsgAddClub] = useState(false);
       const addClubb = (dataClub) => {
        setLoadingAddClub(true)
         axios.post(`${baseUrl}club` , dataClub ,
         {
          headers : {
            accessToken : authTokenSission
          }
         }
         )
        .then( (res) => {
         // console.log(res)
         setShowSuccessMsgAddClub(true);
         setMsgSuccessAddClub(res.data.message);
         getAllClub()
        })
        .catch( (err) => {
         //console.log(err , "in add");
         setShowErrMsgAddClub(true);
          if (!err?.response) {
            setMsgErrAddClub("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response.status === 409){
            setMsgErrAddClub(err.response.data.message);
        }
          else if (err.response.status === 500){
            setMsgErrAddClub(err.response.data.message);
        }
          else {
            setMsgErrAddClub("Failed Add Information Club");
          }
        })

       }

       //UPDATE
       const [statusForUpdateClub , setStatusForUpdateClub] = useState(false)
       const editClubb = ( id , dataClub ,  statusImageOrNot , oldImage) => {
        setLoadingAddClub(true)
         axios.patch(`${baseUrl}club/${id}/${statusImageOrNot}/${oldImage}` , dataClub , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
         // console.log(res)
         setShowSuccessMsgAddClub(true);
         setMsgSuccessAddClub(res.data.message);
         getAllClub()
        })
        .catch( (err) => {
         // console.log(err , "in add");
         setShowErrMsgAddClub(true);
          if (!err?.response) {
            setMsgErrAddClub("No Server Response");
          }
          else if (err.response.status === 401){
            navigatee("/login");
          }
          else if (err.response.status === 409){
            setMsgErrAddClub(err.response.data.message);
        }
          else if (err.response?.status === 500){
            setMsgErrAddClub(err.response.data.message);
        }
          else {
            setMsgErrAddClub("Failed Add Information Club");
          }
        })

       }

       // GET ONE
       const [idClub , setIdClub] = useState();
       const [nameClub , setNameClub] = useState("")
       const [clubImage , setClubImage] = useState("");
       const [clubBody , setClubBody] = useState("");
       const [showEditClub , setShowEditClub] = useState(false);
       const getOneClub = (id) => {
        axios.get(`${baseUrl}club/info-club/${id}` , {isDelete : 1} , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
          //console.log(res);
          setIdClub(res.data.id);
          setNameClub(res.data.club_name);
          setClubImage(res.data.image);
          setClubBody(res.data.body);
          setStatusForUpdateClub(true);
          setShowEditClub(true);
        })
        .catch( (err) => {
         // console.log(err);
          
        })
       }

       //UPLOAD
       const [imageUrl , setImageUrl] = useState("")
       const upload = (image)  => {
        
        axios.post(`${baseUrl}club/upload`, image)
        .then( (res) => {
         setImageUrl(res.data)
      
        })
        .catch( (err) => {
        
        })
       }

       const deleteClub = (id) => {
        axios.patch(`${baseUrl}club/delete/${id}`, {isDelete : 1} , {
          headers : {
            accessToken : authTokenSission
          }
        })
        .then( (res) => {
         // console.log("Successfully Delete Club");
          // console.log(res)
          getAllClub();

        })
        .catch( (err) => {
         // console.log(err);
          if (err.response.status === 401){
            navigatee("/login");
          }
        })
       }
       //console.log(upload);
       //===========================================================================

       //================================= LOGIN ===================================

       const [loadingLogin , setLoadingLogin] = useState(false);
       const [errMsgLogin , setErrMsgLogin ] = useState("");
       const [showErrMsgLogin , setShowErrMsgLoin] = useState(false);
       const [navigate ,setNavigate] = useState(false);
      
       const navigatee = useNavigate()
       const login = (dataUser) => {
        setLoadingLogin(true)

        axios.post(`${baseUrl}user/log-in` , dataUser , {
          headers: {
            "Content-Type" : "application/json",
            'Accept': 'application/json',
            'Authorization': 'Basic ',
          }
        }  )
        .then( (res) => {
        //  console.log(res);
          sessionStorage.setItem("accessToken" , res.data.token);
          sessionStorage.setItem("name_user" , res.data.user);
         // console.log(res.data.token);
        //  console.log(res.data.user)

        //console.log(res)
          setLoadingLogin(false);
          setNavigate(true);
         
          navigatee("/dashboard/main")
        
        })
        .catch( (err) => {
         // console.log(err)
       //  console.clear()
          setLoadingLogin(false);
          setShowErrMsgLoin(true);
          if (!err?.response) {
            setErrMsgLogin("No Server Response");
          }
          else if (err.response.status === 401){
            setErrMsgLogin(err.response.data.message);
        }
          else if (err.response?.status === 500){
            setErrMsgLogin(err.response.data.message);
        }
          else {
            setErrMsgLogin("Failed Login");
          }
        })
       }
       
       function logOut() {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("name_user");
        navigatee("/login");
       }

       function checkToken(){
        axios.get(`${baseUrl}user/auth/auth` ,
        {
          headers : {
            accessToken : authTokenSission,
          }
        })
        .then( (res) => {
         // console.log(res , "err")
         //console.log(res)
        })
        .catch( (err) => {
          navigatee("/login");
        })
       }

       function checkTokenTwo() {
       //console.clear()
        if (authTokenSission == undefined || sessionStorage.getItem("name_user") == undefined ) {
          navigatee("/login");
        }
       }

      
       //===========================================================================

    return (
        <UrlsContext.Provider value={{
              dataCateAndProd , categoryAndProducts , dataCategoryAndProductsLoading , dataCategoryAndProductsErrMsg , dataCategoryAndProductsErrMsgShow ,
              Categories , dataCategory ,
              updateLikeDelete , updateDataProduct ,
              productUpdate, setProductUpdate , idProductForUpdate , idCategoryForUpdate , productNameForUpdate , priceForUpdate ,
              addCompany , loadingAddCompane , successMsgAddCompany , showSuccessMsgAddCompany , errMsgAddCompany , showErrMsgAddCompany ,
              setShowSuccessMsgAddCompany , setShowErrMsgAddCompany , setLoadingAddCompane ,
              getCompaniesData, companiesData , dataCompaniesLoading , dataCompaniesErrMsg , dataCompaniesErrMsgShow , updateLikeDeleteCompany ,
              getOneDataCompany , companyUpdate ,companyIdForUpdate , conmpanyNameForUpdate , logoCompanyForUpdate , bodyCompanyForUpdate , setCompanyUpdate , updateCompanyLoading ,
              updateDataCompany , 
              addUsers , loadingAddUser , setLoadingAddUser , msgSuccessAddUser , setMsgSuccessAddUser , showSuccessMsgAddUser , setShowSuccessMsgAddUser , msgErrAddUser , setMsgErrAddUser , showErrMsgAddUser , setShowErrMsgAddUser ,
              getAllUsers , deleteUser , usersData , dataUsersLoading , dataUsersErrMsg , dataUsersErrMsgShow ,
              getOneUser , updateDateUser , statusForUpdate ,setStatusForUpdate , idUser , user , userNamee ,
              addClubb , upload , imageUrl , setImageUrl ,
              loadingAddClub , setLoadingAddClub , msgSuccessAddClub , setMsgSuccessAddClub , showSuccessMsgAddClub , setShowSuccessMsgAddClub , msgErrAddClub , setMsgErrAddClub , showErrMsgAddClub , setShowErrMsgAddClub , 
              getAllClub  ,deleteClub , clubsData , setClubsData , dataClubsLoading , setDataClubsLoading , dataClubsErrMsg , setDataClubsErrMsg , dataClubsErrMsgShow , setDataClubsErrMsgShow ,
              getOneClub , editClubb , statusForUpdateClub , setStatusForUpdateClub , idClub , nameClub , clubImage , clubBody ,
              login ,loadingLogin , errMsgLogin , showErrMsgLogin , navigate ,
              authTokenSission,
              checkToken, logOut , checkTokenTwo
              , showEditClub , setShowEditClub

        }}>
            {children}
        </UrlsContext.Provider>
    )
}


export const useUrlsContext = () => useContext(UrlsContext);