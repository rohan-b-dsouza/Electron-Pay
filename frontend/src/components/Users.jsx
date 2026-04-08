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
      <div className="mt-8 ml-10 font-medium">Users</div>
      <div className="max-w-full bg-white mt-4 p-4 ml-10 mr-10 rounded-lg shadow-sm mb-1">
        <input
          className="w-full max-w-full px-1"
          type="search"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="max-w-full bg-white mt-4 ml-10 mr-10 rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200 w-full">
          {usersList.length === 0 ? (
            <div className="text-md text-center py-4 px-6">No users found</div>
          ) : (
            usersList.map((user) => {
              return (
                <div key={user._id}>
                  <div className="flex justify-between items-center py-4 px-6">
                    <div className="flex items-center">
                      <div className="rounded-full text-white bg-[#1A3CFF] w-10 h-10 flex justify-center items-center ml-2 mr-4">
                        <div>{capitalize(user.firstName)[0]}</div>
                      </div>
                      <div>{capitalize(user.firstName)}</div>
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
