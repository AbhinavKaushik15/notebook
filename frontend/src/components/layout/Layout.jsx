import TopNavbar from "../topNavbar/TopNavbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] ">
      <div className="lg:hidden">
        <TopNavbar />
      </div>

      <div className="min-h-screen flex">
        <nav className="fixed flex-none ... hidden lg:block">
          <Sidebar />
        </nav>

        <main className="flex lg:pl-23 overflow-hidden mx-auto">
          <div className="flex justify-center">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
