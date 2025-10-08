import { CirclePlus, CircleUser, House, LogOut } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/data/MyContext";

const Sidebar = () => {
  const context = useContext(MyContext);
  const { logoutHandle } = context;

  return (
    <div className="h-screen border-r border-white bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] w-full px-5">
      <h1 className="w-full text-white text-2xl font-[700] text-center pt-10">
        NoteBook
      </h1>
      <div className="flex flex-col justify-center items-start gap-4 mx-auto pt-32">
        <Link
          className="w-40 flex items-center gap-2 self-center text-xl border border-white text-white transition-all ease-in-out py-2 px-4 rounded-md hover:rounded-full"
          to="/"
        >
          <House />
          Home
        </Link>
        <Link
          className="w-40 flex items-center gap-2 self-center text-xl border border-white text-white transition-all ease-in-out py-2 px-4 rounded-md hover:rounded-full"
          to="/addnote"
        >
          <CirclePlus />
          Add Note
        </Link>
        <Link
          className="w-40 flex items-center gap-2 self-center text-xl border border-white text-white transition-all ease-in-out py-2 px-5 rounded-md hover:rounded-full"
          to="/profile"
        >
          <CircleUser />
          Profile
        </Link>
        <button
          onClick={logoutHandle}
          className="w-40 cursor-pointer flex items-center gap-2 self-center text-xl border border-white text-white transition-all ease-in-out py-2 px-5 rounded-md hover:rounded-full"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
