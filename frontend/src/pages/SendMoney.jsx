import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

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
  const [username, setUsername] = useState("");
  const [recipientLoading, setRecipientLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setRecipientLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/user/${toUserId}`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          },
        );
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUsername(response.data.username);
      } catch (err) {
        const status = err.response?.status;
        console.log("12332");
        console.log(status);
        if (status == 404 || status == 500) {
          navigate("/dashboard");
          return;
        } else {
          navigate("/signin");
          return;
        }
      } finally {
        setRecipientLoading(false);
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
        `${BASE_URL}/api/v1/user/account/transfer`,
        {
          toUserId,
          amount,
        },
        {
          headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
        },
      );
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
    <div className="flex justify-center items-center min-h-screen bg-[#F0F2F5] px-5">
      {success ? (
        <div>
          <div className="bg-[#ffffff] max-w-lg w-full flex flex-col  shadow-sm rounded-xl justify-center items-center space-y-4 py-12 sm:py-15 sm:px-12 px-6">
            <div className="w-16 h-16 bg-[#D4F5E9] rounded-full shadow-sm display items-center flex justify-center">
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
            <div className="text-2xl text-[#0B0F1A] font-semibold">
              Payment Successful
            </div>
            <div className="text-2xl text-[#8A8F9E]">
              {amount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </div>
            <div className="text-[#8A8F9E]">{"Paid to"}</div>
            <div className="">
              {capitalize(firstName)} {capitalize(lastName)}
            </div>
            <div className="text-sm text-[#7d7d7e] break-all">
              User ID: {username}
              {"@electronpay"}
            </div>
            <button
              className="text-sm text-[#ffffff] bg-[#1A3CFF] font-semibold py-3.5 rounded-md w-full cursor-pointer hover:bg-[#0A1FA8]"
              onClick={() => navigate("/dashboard", { replace: true })}
            >
              Back to dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#ffffff] max-w-lg w-full flex flex-col  shadow-sm rounded-lg">
          <div className="divide-y divide-gray-200">
            <div className="flex items-center px-7 py-5">
              <svg
                onClick={() => navigate("/dashboard")}
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
            {recipientLoading ? (
              <div className="flex items-center py-7 px-7 animate-pulse">
                <div className="rounded-full text-white bg-gray-200 w-10 h-10 flex justify-center items-center ml-2 mr-4 "></div>
                <div className="flex flex-col space-y-1">
                  <div className="bg-gray-200 w-24 h-5 rounded">
                  </div>
                  <div className="bg-gray-200 w-24 h-5 rounded">
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center py-7 px-7">
                <div className="rounded-full text-white bg-[#1A3CFF] w-10 h-10 flex justify-center items-center ml-2 mr-4 ">
                  <div>{capitalize(firstName)[0]}</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-lg text-[#0B0F1A]">
                    {capitalize(firstName)} {capitalize(lastName)}
                  </div>
                  <div className="text-sm text-[#8A8F9E] font-normal">
                    Recipient
                  </div>
                </div>
              </div>
            )}

            <div className="py-7 px-9 space-y-5">
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
                <p className="text-[#CF1C1C] text-xs">{errors.account}</p>
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

              <div className="text-[#050505] font-normal sm:text-sm flex items-center flex-col text-xs">
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
