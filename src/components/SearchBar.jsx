export default function SearchBar({ searchInput, setSearchInput, onSearch, disabled }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-400 rounded-l px-3 py-1 w-80 focus:outline-none"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        disabled={disabled}
      />
      <button
        onClick={onSearch}
        className={`bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 transition ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
      >
        Search
      </button>
    </div>
  );
}
