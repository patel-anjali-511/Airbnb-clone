import { API_BASE_URL } from "../../config/api";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="border border-gray-200 w-full md:w-auto py-1.5 px-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer bg-white">
      <div className="flex flex-row items-center justify-between gap-1">
        {/* House icon + Anywhere */}
        <div className="flex items-center gap-2.5 pl-2 pr-4 text-sm font-semibold text-gray-900">
          <div className="w-10 h-10 flex items-center justify-center overflow-visible">
            <img
              src={`${API_BASE_URL}/assets/searchbar-house.png`}
              alt="Stays"
              className="w-10 h-10 object-contain scale-125"
            />
          </div>

          <span>Anywhere</span>
        </div>

        {/* Anytime */}
        <div className="hidden sm:block text-sm font-semibold px-5 border-x border-gray-200 text-gray-900 text-center">
          Anytime
        </div>

        {/* Add guests + Search Button */}
        <div className="text-sm pl-4 pr-1 text-gray-500 flex flex-row items-center gap-3">
          <div className="hidden sm:block font-normal">Add guests</div>
          <div className="p-2 bg-[#ff385c] rounded-full text-white hover:bg-[#e00b41] transition">
            <SearchIcon size={14} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
