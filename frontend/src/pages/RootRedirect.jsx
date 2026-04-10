import { useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;


export default function RootRedirect() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(()=> {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        const authChecker = async ()=> {
            try {
                const authCheck = await axios.get(`${BASE_URL}/api/v1/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAuthenticated(true);
            }   
            catch(error) {
                localStorage.removeItem("token");
            }
            finally {
                setLoading(false);
            }
        }
        authChecker();
    }, []);
    if (loading) return (
        <div>Loading...</div>
    )
    return authenticated ? <Navigate to="/dashboard"/> : <Navigate to="/landing"/>
}