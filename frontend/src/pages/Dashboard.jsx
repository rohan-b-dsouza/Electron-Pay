import { useState, useEffect } from "react"
import Balance from "../components/Balance"
import Topbar from "../components/Topbar"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import EditProfile from "../components/EditProfile"

const BASE_URL = import.meta.env.VITE_API_URL;


export default function DashBoard() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const fetchData = async()=> {
        try {
            const [meRes, balanceRes] = await Promise.all([
                axios.get(`${BASE_URL}/api/v1/user/me`, config),
                axios.get(`${BASE_URL}/api/v1/user/account/balance`, config),
            ]);
            setFirstName(meRes.data.firstName);
            setLastName(meRes.data.lastName);
            setEmail(meRes.data.email);
            console.log(balanceRes.data);
            setBalance(balanceRes.data.balance);
        }
        catch(err) {
            const status = err.response?.status;
            if (err.response?.status == 401 || err.response?.status == 404) {
                localStorage.removeItem("token");
                navigate('/signin');
                return;
            }
        }
    }
    useEffect(()=> {
        fetchData();
    }, []);
    return (
        <>
            <div className={`bg-[#F0F2F5] min-h-screen`}>
                <Topbar firstName={firstName} initials={firstName[0]} email={email} lastName={lastName} onEditProfile={()=>setShowModal(showModal=>!showModal)}></Topbar>
                <div className="px-10">
                    <Balance balance={balance != null ? balance / 100 : null}></Balance>
                    <Users></Users>
                </div>
                {
                    showModal && (
                        <EditProfile onClose={()=>setShowModal(false)} onEdit={fetchData}></EditProfile>
                    )
                }
            </div>
        </>
    )
}