import { useState } from "react";
import MyContext from "./MyContext";
import toast from "react-hot-toast";

const MyState = (props) => {
  // getAllNotes
  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  
  // add note
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/fetchallnotes`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const notesData = await res.json();
      setAllNotes(notesData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // add note
  const addNote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, tag, description }),
      }
    );

    const addNoteData = await res.json();

    getAllNotes();

    if (addNoteData.error) {
      toast.error(addNoteData.error);
    } else {
      toast.success(addNoteData.success);
    }
    window.location.href = "/";
    setTitle("");
    setTag("");
    setDescription("");
  };

  // delete note
  const deleteNote = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const noteData = await res.json();

    getAllNotes();
    console.log(noteData);

    toast.success(noteData.success);
  };

  return (
    <MyContext.Provider
      value={{
        allNotes,
        getAllNotes,
        loading,
        title,
        setTitle,
        tag,
        setTag,
        description,
        setDescription,
        addNote,
        deleteNote,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
