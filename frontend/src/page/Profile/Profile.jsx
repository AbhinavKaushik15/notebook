import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { CircleUser } from "lucide-react";
import MyContext from "../../context/data/MyContext";

const Profile = () => {
  const context = useContext(MyContext);
  const { allNotes } = context;
  const [user, setUser] = useState([]);

  const profileHandle = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const profileData = await res.json();
    setUser(profileData);
  };

  useEffect(() => {
    profileHandle();
  }, []);

  return (
    <Layout>
      <div className="w-[100vw] h-screen pt-40 flex flex-col gap-5 items-center p-20 mx-auto">
        <CircleUser className="text-white w-24 h-24" />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-white text-4xl">{user.name}</h1>
          <p className="text-white">{user.email}</p>
          <p className="text-white">Total Notes Created : {allNotes.length}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
