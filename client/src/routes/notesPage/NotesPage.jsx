import React, { useEffect, useState } from "react";
import NoteCard from "../../components/noteCard/noteCard";
import axios from "axios";
import './notesPage.scss';
import { BASE_URL } from "../../serverURLs";

const NotesPage = () => {
  const msgStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    height: "50vh",
    color: "#aaa",
    letterSpacing: "1px",
    fontSize: "1.3em",
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = () => {
      axios
        .get(`${BASE_URL}/allNotes`, { withCredentials: true })
        .then((res) => {
          if (res.data.content) {
            setNotes(res.data.content);
          } else {
            setNotes([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h1 className="headline">
        Your <span>Notes</span> 
      </h1>

      <div className="cards">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))
        ) : (
          <p style={msgStyle}>No Notes To Show</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
