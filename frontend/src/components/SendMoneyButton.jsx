export default function SendMoneyButton({onClick}) {
    return (
        <div>
            <button className="text-sm text-white font-medium rounded-sm bg-[#1A3CFF] p-3 hover:bg-[#0A1FA8] shadow-sm" onClick={onClick}>
                Send Money 
            </button>
        </div>
    )
}