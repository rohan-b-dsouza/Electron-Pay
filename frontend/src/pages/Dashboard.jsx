import { useState, useEffect } from "react"
import Balance from "../components/Balance"
import Topbar from "../components/Topbar"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import EditProfile from "../components/EditProfile"

export default function DashBoard() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [filter, setFilter] = useState("");
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
                axios.get('http://localhost:3000/api/v1/user/me', config),
                axios.get('http://localhost:3000/api/v1/user/account/balance', config),
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
    useEffect(()=> {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const fetchUsersList = async()=> {
            try {
                const searchRes = await axios.get(`http://localhost:3000/api/v1/user/search?filter=${filter}`, config);
                setUsersList(searchRes.data.users);
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
        fetchUsersList();

    }, [filter]);
    return (
        <>
            <div className={`bg-[#F0F2F5] min-h-screen`}>
                <Topbar firstName={firstName} initials={firstName[0]} email={email} lastName={lastName} onEditProfile={()=>setShowModal(showModal=>!showModal)}></Topbar>
                <div className="px-10">
                    <Balance balance={balance / 100}></Balance>
                    <Users usersList={usersList} setFilter={setFilter}></Users>
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