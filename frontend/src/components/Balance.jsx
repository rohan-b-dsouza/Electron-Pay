export default function Balance({ balance }) {
  return (
    <div className="flex max-w-lg w-full bg-white mt-8 p-6 rounded-lg shadow-sm">
      <div>
        {console.log(balance)}
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

