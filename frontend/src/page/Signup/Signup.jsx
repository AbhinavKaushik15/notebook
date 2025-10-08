import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupHandler = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const signupData = await res.json();
    console.log(signupData);

    if (signupData.error) {
      toast.error(signupData.error);
    } else {
      toast.success(signupData.success);
      navigate("/login");
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <div className="flex flex-col gap-14 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-4xl w-[90vw] lg:w-[40vw] border border-white py-14 px-5">
        <h1 className="text-4xl text-white text-center">Signup</h1>
        <div className="flex flex-col gap-5">
          <input
            className="w-full border text-lg border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white"
            placeholder="Enter Full Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border text-lg border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white text-lg"
            placeholder="Create password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={signupHandler}
            className="w-full text-lg cursor-pointer bg-[#ffffffa4] hover:bg-white transition-all duration-100 ease-initial py-4 px-7 font-[600] rounded-full"
          >
            Signup
          </button>
          <p className="text-white text-center text-md lg:text-lg">
            Have an account
            <Link className="text-[#a09cf4] hover:underline ml-1" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
