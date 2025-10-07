import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await res.json();
    console.log(loginData);

    if (loginData.error) {
      toast.error(loginData.error);
    } else {
      navigate("/");
      toast.success(loginData.success);
      localStorage.setItem("token", loginData.token);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <div className="flex flex-col gap-14 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-4xl w-[70vw] border border-white p-20">
        <h1 className="text-4xl text-white text-center">Login</h1>
        <div className="flex flex-col gap-5">
          <input
            className="w-full border text-lg border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white"
            placeholder="Enter email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white text-lg"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={loginHandler}
            className="w-full text-lg bg-[#ffffffa4] hover:bg-white transition-all duration-100 ease-initial py-4 px-7 font-[600] rounded-full"
          >
            Login
          </button>
          <p className="text-white text-center text-lg">
            Don't have an account
            <Link className="text-[#a09cf4] hover:underline ml-1" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
