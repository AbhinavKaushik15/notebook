import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/MyContext";

const AddNote = () => {
  const context = useContext(MyContext);
  const { title, setTitle, tag, setTag, description, setDescription, addNote } =
    context;

  return (
    <Layout>
      <div className="flex flex-col gap-14 absolute top-1/2 left-1/2 lg:left-[58vw] -translate-x-1/2 -translate-y-1/2 rounded-4xl w-[70vw] border border-white p-20">
        <h1 className="text-4xl text-white text-center">Add Note</h1>
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
            onClick={addNote}
            className="w-full text-lg bg-[#ffffffa4] hover:bg-white transition-all duration-100 ease-initial py-4 px-7 font-[600] rounded-full"
          >
            Add Note
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddNote;
