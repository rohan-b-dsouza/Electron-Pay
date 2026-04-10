import { useNavigate } from "react-router-dom";
import SendMoneyButton from "./SendMoneyButton";

const capitalize = (s)=> {
  const firstChar = s[0].toUpperCase();
  const rest = s.slice(1);
  return firstChar + rest;
}

export function Users({ usersList, setFilter }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="max-w-full bg-white mt-8 p-4 rounded-lg shadow-sm mb-1">
        <input
          className="w-full max-w-full px-1"
          type="search"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="max-w-full bg-white mt-4 rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200 w-full">
          {usersList.length === 0 ? (
            <div className="text-md text-center py-4 px-6">No users found</div>
          ) : (
            usersList.map((user) => {
              return (
                <div key={user._id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 px-6">
                    <div className="flex items-center">
                      <div className="rounded-full text-white bg-[#1A3CFF] w-10 h-10 flex justify-center items-center ml-2 mr-4 shrink-0">
                        <div>{capitalize(user.firstName)[0]}</div>
                      </div>
                      <div>
                        <div>{capitalize(user.firstName)}</div>
                        <div className="text-xs sm:text-sm text-[#8A8F9E] break-all">{user.username}{"@electronpay"}</div>
                      </div>
                    </div>
                    <SendMoneyButton onClick={()=>navigate(`/send-money/${user._id}`)}></SendMoneyButton>
                  </div>
                </div>
              ); 
            })
          )}
        </div>
      </div>
    </div>
  );
}
