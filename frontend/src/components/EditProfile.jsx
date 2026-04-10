import { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function EditProfile({ onClose, onEdit }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/update`,
        {
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setErrors({});
      onEdit();
      onClose();
    } catch (err) {
      setLoading(false);
      const backendErrors = err.response?.data?.errors;
      if (backendErrors) {
        setErrors(backendErrors);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="backdrop-blur-xs inset-0 fixed flex flex-col justify-center items-center  backdrop-brightness-70">
      <div className="bg-[#ffffff] rounded-lg */ divide-y divide-gray-300 max-w-md w-full">
        <div className="flex justify-between p-6">
          <div className="font-medium">Edit Profile</div>
          <svg
            onClick={onClose}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CF1C1C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:stroke-[#A31515] transition-colors"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <div className="space-y-5 p-6">
          <InputBox
            label="First Name"
            placeholder="Alex"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
            error={errors.firstName}
          ></InputBox>

          <InputBox
            label="Last Name"
            placeholder="James"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
            error={errors.lastName}
          ></InputBox>

          <InputBox
            label="New Password"
            placeholder="Use a mix of letters, numbers & symbols"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            error={errors.password}
          ></InputBox>
          <button
                className={`font-bold shadow-sm rounded-sm pl-2 pr-2 pt-3 pb-3 w-full mt-3 text-[#ffffff] cursor-pointer ${loading ? "bg-[#0A1FA8] cursor-not-allowed" : "bg-[#1A3CFF] hover:bg-[#0A1FA8]"}`}
                onClick={handleSave}
                disabled={loading}
              >
              
                <div className="flex gap-2 justify-center items-center">
                  {loading && (
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full  animate-spin border-gray-300"></div>
                  )}
                  {loading ? "Saving" : "Save Changes"}
                </div>
              </button>
          
        </div>
      </div>
    </div>
  );
}
