export default function Button({ onClick, loading, content, loadingContent }) {
  return (
    <button
      disabled={loading}
      className="font-bold shadow-sm rounded-sm pl-2 pr-2 pt-3 pb-3 w-full mt-3 bg-[#1A3CFF] text-[#ffffff] hover:bg-[#0A1FA8] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center items-center">
        {loading && (
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full  animate-spin border-gray-300"></div>
        )}
        {loading ? loadingContent : content}
      </div>
    </button>
  );
}
