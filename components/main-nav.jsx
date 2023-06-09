import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup"; //Optional for grouping

const MainNav = () => {
  return (
    <div className="h-[60px] bg-white shadow-md">
      <div className="container h-full">
        <div className="flex items-center h-full justify-between">
          <div className="text-xl font-medium text-black">Allo Khayi</div>
         
        </div>
      </div>
    </div>
  );
};

export default MainNav;
