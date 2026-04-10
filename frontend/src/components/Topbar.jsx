import { useNavigate } from "react-router-dom";
import { useState } from "react";
const capitalize = (s) => {
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1);
};

export default function Topbar({ firstName, initials, email, onEditProfile }) {
  const navigate = useNavigate();
  const name = capitalize(firstName);
  const [dropdown, setDropdown] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    return;
  };

  return (
    <div className="flex justify-between text-[#0B0F1A] bg-[#ffffff] p-3 items-center border-b border-[#E8E7E2] text-base relative ">
      <div className="font-normal ml-4 flex justify-center items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1A3CFF] mr-2"></div>
        <div
          className="font-medium text-lg cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          ElectronPay
        </div>
      </div>
      <div className="font-normal flex items-center">
        <div className="font-medium">
          <span className="text-[#8A8F9E] font-normal">Welcome,</span> {name}
        </div>
        <div
          className="rounded-full text-white bg-[#1A3CFF] w-10 h-10 flex justify-center items-center ml-2 mr-4 cursor-pointer"
          onClick={() => setDropdown((dropdown) => !dropdown)}
        >
          <div>{name[0]}</div>
        </div>

        {dropdown && (
          <div className="absolute  top-16.5 bg-[#ffffff] divide-y divide-gray-200 shadow-sm right-15 rounded-md max-w-md flex flex-col">
            <div className="flex justify-between items-center py-4 px-4">
              <div className="flex items-center">
                <div className="rounded-full text-white bg-[#1A3CFF] w-9 h-9 flex justify-center items-center ml-2 mr-4">
                  <div>{name[0]}</div>
                </div>
                <div>
                  <div className="text-sm">{name}</div>
                  <div className="text-xs text-[#8A8F9E]">{email}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center px-5 gap-x-2 py-2.5 cursor-pointer" onClick={()=>{
              setDropdown(false);
              onEditProfile();
            }}>
              <div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D4155"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div className="text-sm" onClick={() => setDropdown(false)}>
                Edit Profile
              </div>
            </div>
            <div
              className="flex items-center px-5 py-2.5 gap-x-2 cursor-pointer"
              onClick={() => handleSignout()}
            >
              <div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CF1C1C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <div className="text-sm text-[#CF1C1C]">Sign out</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// #0B0F1A black main fonts
// #1A3CFF blue button
// border gray 400
// blind text #8A8F9E
