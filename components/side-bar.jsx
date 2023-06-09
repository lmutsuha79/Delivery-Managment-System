import { faDashboard, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Sidebar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const SideBare = () => {
  return (
    <aside className="mt-4 bg-white rounded-e-md h-[calc(100vh-60px)] fixed top-[60px] left-0 w-[200px]">
      <div className="px-4 py-8">
            <div className="flex flex-col gap-4">
                  <Link href={"/"} className="text-black flex items-center gap-3 text-lg font-medium bg-slate-100 rounded-e-md py-4 px-2">
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Overview</span>
                  </Link>
                  <Link href={"/"} className="text-black flex items-center gap-3 text-lg font-medium bg-slate-100 rounded-e-md py-4 px-2">
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Overview</span>
                  </Link>
                  <Link href={"/"} className="text-black flex items-center gap-3 text-lg font-medium bg-slate-100 rounded-e-md py-4 px-2">
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Overview</span>
                  </Link>
                  <Link href={"/"} className="text-black flex items-center gap-3 text-lg font-medium bg-slate-100 rounded-e-md py-4 px-2">
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Overview</span>
                  </Link>
                  <Link href={"/"} className="text-black flex items-center gap-3 text-lg font-medium bg-slate-100 rounded-e-md py-4 px-2">
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Overview</span>
                  </Link>
            </div>
        <div className="bg-main_blue rounded-md px-2 py-2 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full "
                src={"/images/yasser_avatar.png"}
                alt="jiji"
                width={35}
                height={35}
              />
              <span className="text-white font-medium text-sm">
                Khelil Yasser
              </span>
            </div>

            <button onClick={() => alert("logout")}>
              <FontAwesomeIcon
                className="text-slate-300 hover:text-white transition-colors"
                icon={faSignOut}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBare;
