export default function Balance({ balance }) {
  if (balance == null) {
    return (
      <div className="animate-pulse max-w-sm mt-8 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-45 bg-gray-200 rounded"></div>
      </div>
    );
  }
  return (
    <div className="flex max-w-lg w-full bg-white mt-8 p-6 rounded-lg shadow-sm">
      <div>
        {/* {console.log(balance)} */}
        <div className="text-sm text-[#8A8F9E] font-normal">Your Balance</div>
        <div className="text-2xl font-medium mt-1">
          {balance.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </div>
      </div>
    </div>
  );
}
