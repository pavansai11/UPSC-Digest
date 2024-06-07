import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './notesPage.scss';
import { BASE_URL } from "../../serverURLs";

export default function EditForm() {
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/noteDetails/${id}`, { withCredentials: true })
      .then((res) => {
        setNote(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .patch(`${BASE_URL}/updateNote/${id}`, note, { withCredentials: true })
      .then(() => {
        navigate(`/notes/details/${id}`);
        Swal.fire("Your note has been updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="headline">
        Edit <span>Note</span>
      </h1>
      <form className="note-form">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={changeHandler}
          placeholder="Title of Note ..."
        />
        <textarea
          name="details"
          rows="5"
          value={note.details}
          onChange={changeHandler}
          placeholder="Describe Your Note ..."
        ></textarea>
        <button onClick={submitHandler}>Save Changes</button>
      </form>
    </div>
  );
}
