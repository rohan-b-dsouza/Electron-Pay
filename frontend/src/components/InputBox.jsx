export default function InputBox({label, placeholder, type, onChange, error}) {
    return (
        <div className="space-y-2">
            <div className="font-medium text-base">
                {label}
            </div>
            <input className="text-sm border border-gray-300 p-2 rounded-sm w-full text-[#0B0F1A] font-normal bg-[#F0F2F5]" type={type} placeholder={placeholder} onChange={onChange}/>
            {
                error && (
                    <p className="text-[#CF1C1C] text-xs mt-1">{error}</p>
                )
            }
        </div>
    )
}

