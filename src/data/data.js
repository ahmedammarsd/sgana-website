import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { SiFigshare } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
//import logo from "../images/logo.jpg";
import { HiUserGroup } from "react-icons/hi";
import zain from "../images/zain.svg";
import mtn from "../images/M-C.svg";
import sudani from "../images/S-C.svg"


export const mainContainer = 'mt-[100px] m-2 md:m-10 p-2 md:p-10 bg-white rounded-md shadow-md border';


export const activeLink =
"flex items-center gap-5 pr-4 pt-3 pb-2.5 rounded-lg text-md m-2  m-2 text-white bg-second-blue transition-all duration-300 ease-linear";
export const normalLink =
"flex items-center gap-5 pr-4 pt-3 pb-2.5 rounded-lg text-md m-2  m-2 text-second-blue hover:text-white border-r-2 border-second-blue shadow-sm hover:bg-second-blue transition-all duration-300 ease-linear";


export const linksDashboard = [
    {
        name : "اللوحة الرئيسية",
        icon : <MdOutlineSpaceDashboard />,
        link : "main",
    },
    {
        name : "المواد",
        icon : <IoPricetagsOutline />,
        link : "items-price",
    },
    {
        name : "الشركات",
        icon : <SiFigshare />,
        link : "companies",
    },
    {
        name : "ملتقى السجانة",
        icon : <HiUsers />,
        link : "club",
    },
    {
        name : "المستخدمين",
        icon : <RiUserSettingsLine />,
        link : "users",
    },
    // {
    //     name : "Log-Out",
    //     icon : <MdLogout />,
    //     link : "/",
    // }

];


export const dataElectornic = [
    {
        number: 10,
        logo : zain,
        icon : <HiUserGroup />,
        company : "zain",
    },
    {
        number: 8,
        logo : mtn,
        icon : <HiUserGroup />,
        company : "mtn",
    },
    {
        number: 9,
        logo : sudani,
        icon : <HiUserGroup />,
        company : "sudani",
    }
]