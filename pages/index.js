import Image from "next/image";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDashboard } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import SideBar from "@/components/side-bar";
import MainNav from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const fetchData = async () => {
    const { data, error } = await supabase.from("test").select("*");
    if (error) {
      console.log(error);
    }
    console.log(data);

    // Handle data or error
  };
  return (
    <main>
      hello
      {/* <MainNav />
      <SideBar /> */}
    </main>
  );
}
