import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getnotebyid = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/notes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();
    setTitle(data?.title);
    setTag(data?.tag);
    setDescription(data?.description);
  };

  // Get data automatically
  useEffect(() => {
    getnotebyid();
  }, [id]);

  // update Function
  const updateNote = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, tag, description }),
        }
      );
      const updatedData = await res.json();

      if (updatedData.error) {
        toast.error(updatedData.error);
      } else {
        toast.success(updatedData.success);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-14 absolute top-1/2 left-1/2 lg:left-[58vw] -translate-x-1/2 -translate-y-1/2 rounded-4xl w-[70vw] border border-white p-20">
        <h1 className="text-4xl text-white text-center">Update Note</h1>
        <div className="flex flex-col gap-5">
          <input
            className="w-full border text-lg border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full border border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white text-lg"
            placeholder="Tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <input
            className="w-full border border-white py-4 px-7 outline-none rounded-full placeholder:text-[3dadada] text-white text-lg"
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={updateNote}
            className="w-full text-lg bg-[#ffffffa4] hover:bg-white transition-all duration-100 ease-initial py-4 px-7 font-[600] rounded-full"
          >
            Update Note
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateNote;
