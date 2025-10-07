import { SquarePen, Trash } from "lucide-react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/data/MyContext";

const NoteCard = () => {
  const context = useContext(MyContext);
  const { allNotes, getAllNotes, loading, deleteNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    }
  }, []);

  return (
    <div className="lg:w-[100vw] min-h-screen flex flex-col items-center">
      <div className="w-full flex items-center justify-center text-3xl underline text-white py-5">
        All Notes
      </div>

      {loading ? (
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 py-7">
          {allNotes.length > 0 ? (
            allNotes.map((item, index) => {
              const { title, tag, description, _id } = item;
              console.log(_id);

              return (
                <div
                  key={index}
                  className="w-[80vw] border border-white text-white flex flex-col justify-center gap-5 p-6 rounded-4xl"
                >
                  <h1 className="text-[3.9vw] sm:text-[3vw] font-[700]">
                    {title}
                  </h1>
                  <h1>{description}</h1>

                  <div className="flex items-center justify-between">
                    <div className="tags w-[65vw] flex items-center gap-5 flex-wrap">
                      <h1 className="w-fit rounded-full text-black px-3 py-1.5 font-[600] bg-white">
                        {tag}
                      </h1>
                    </div>
                    <div className="flex items-center gap-5">
                      <Trash
                        onClick={() => deleteNote(_id)}
                        className="w-7 h-7 cursor-pointer"
                      />
                      <Link to={`/notes/edit/${_id}`}>
                        <SquarePen className="w-7 h-7" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-white text-xl">Notes Not Found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
