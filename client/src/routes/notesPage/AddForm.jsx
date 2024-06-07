import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import './notesPage.scss';
import { BASE_URL } from "../../serverURLs";

const AddForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledTitle = location.state?.prefilledTitle || "";

  const [note, setNote] = useState({
    title: prefilledTitle,
    details: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/addNote`, note, { withCredentials: true })
      .then(() => {
        navigate("/notes");
        Swal.fire({
          title: "Your note has been added successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <h1 className="headline">
        Add <span>Note</span>
      </h1>
      <form className="note-form">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={changeHandler}
          placeholder="Title of Note ..."
          required
        />
        <textarea
          name="details"
          rows="5"
          value={note.details}
          onChange={changeHandler}
          placeholder="Describe Your Note ..."
          required
        ></textarea>
        <button type="submit" onClick={submitHandler}>
          Save Note
        </button>
      </form>
    </div>
  );
};

export default AddForm;
