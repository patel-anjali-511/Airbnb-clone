import { Globe, Menu, User } from "lucide-react";

const UserMenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-1">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Become a host
        </div>
        <div className="hidden md:block py-3 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <Globe size={18} />
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <Menu size={18} />
          <div className="hidden md:block bg-neutral-500 rounded-full text-white p-1">
            <User size={20} className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
