import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const capitalize = (s) => {
  if (!s) return "";
  const firstChar = s[0].toUpperCase();
  const rest = s.slice(1);
  return firstChar + rest;
};

export default function SendMoney() {
  const navigate = useNavigate();
  const { toUserId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/${toUserId}`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          },
        );
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (err) {
        const status = err.response?.status;
        if (status == 404 || status == 500) {
          navigate("/dashboard");
          return;
        }
      }
    };
    getUserData();
  }, [toUserId]);

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleTransfer() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/account/transfer",
        {
          toUserId,
          amount,
        },
        {
          headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
        },
      );
      // await new Promise((resolve)=> setTimeout(resolve, 1200));
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      const backendErrors = err.response?.data?.errors;
      if (backendErrors) {
        setErrors(backendErrors);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#F0F2F5]">
      {success ? (
        <div>
          <div className="bg-[#ffffff] max-w-md w-full flex flex-col  shadow-sm rounded-lg p-15 justify-center items-center space-y-3">
            <div className="w-13 h-13 bg-[#D4F5E9] rounded-full shadow-sm display items-center flex justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00875A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="text-lg text-[#0B0F1A] font-semibold ">
              Transfer Successful
            </div>
            <div className="text-sm text-[#8A8F9E]">
              Rs. {amount} sent to {capitalize(firstName)}{" "}
              {capitalize(lastName)}
            </div>
            <div className=""></div>
            <button
              className="text-sm text-[#ffffff] bg-[#1A3CFF] font-semibold py-2.5 rounded-md w-full cursor-pointer hover:bg-[#0A1FA8]"
              onClick={() => navigate("/dashboard", { replace: true })}
            >
              Back to dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#ffffff] max-w-md w-full flex flex-col  shadow-sm rounded-lg">
          <div className="divide-y divide-gray-200">
            <div className="flex items-center px-5 py-5">
              <svg onClick={()=>navigate('/dashboard')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#3D4110"
                className="size-6 cursor-pointer hover:stroke-[#0B0F1A] transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="text-[#8A8F9E] text-sm pl-2">Send Money</div>
            </div>
            <div className="flex items-center py-7 px-5">
              <div className="rounded-full text-white bg-[#1A3CFF] w-10 h-10 flex justify-center items-center ml-2 mr-4 ">
                <div>{capitalize(firstName)[0]}</div>
              </div>
              <div className="font-medium text-lg text-[#0B0F1A]">
                {capitalize(firstName)} {capitalize(lastName)}
                <div className="text-sm text-[#8A8F9E] font-normal">
                  Recipient
                </div>
              </div>
            </div>

            <div className="py-7 px-7 space-y-5">
              <InputBox
                label="Amount (in Rs)"
                placeholder="0.00"
                type="number"
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setErrors((prev) => ({ ...prev, amount: "", account: "" }));
                }}
                error={errors.amount}
              ></InputBox>
              {errors.account && (
                <p className="text-[#CF1C1C] text-xs" mt-1>
                  {errors.account}
                </p>
              )}
              <button
                className={`font-bold shadow-sm rounded-sm pl-2 pr-2 pt-3 pb-3 w-full mt-3 text-[#ffffff] cursor-pointer ${loading ? "bg-[#0A1FA8] cursor-not-allowed" : "bg-[#1A3CFF] hover:bg-[#0A1FA8]"}`}
                onClick={handleTransfer}
                disabled={loading}
              >
                <div className="flex gap-2 justify-center items-center">
                  {loading && (
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full  animate-spin border-gray-300"></div>
                  )}
                  {loading ? "Processing" : "Initiate Transfer"}
                </div>
              </button>

              <div className="text-[#050505] font-normal text-sm flex items-center flex-col">
                Transfers are instant and cannot be reversed
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
