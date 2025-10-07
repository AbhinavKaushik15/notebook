import { CirclePlus, CircleUser, House, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.clear("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="h-screen border-r border-white bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] w-full px-5">
      <h1 className="text-white text-2xl font-[700] pt-10 text-center">
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
