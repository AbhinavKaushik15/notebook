import { useContext } from "react";
import { Link } from "react-router";
import MyContext from "../../context/data/MyContext";

const TopNavbar = () => {
  const context = useContext(MyContext);
  const { logoutHandle } = context;

  return (
    <div className="fixed top-0 w-full h-32 bg-gradient-to-bl from-[#0f172ae3] via-[#1f1a78e0] to-[#0f172ae5] text-white flex flex-col items-center justify-center gap-5">
      <div>
        <h1 className="text-3xl font-[700]">Notebook</h1>
      </div>
      <div className="flex items-center gap-7 md:gap-10 text-zinc-400">
        <Link className="border px-2 py-1 rounded-full" to="/">
          Home
        </Link>
        <Link className="border px-2 py-1 rounded-full" to="/addnote">
          Add Note
        </Link>
        <Link className="border px-2 py-1 rounded-full" to="/profile">
          Profile
        </Link>
        <button
          className="border px-2 py-1 rounded-full"
          onClick={logoutHandle}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
