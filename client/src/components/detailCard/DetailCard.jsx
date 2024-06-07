import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./detailCard.scss";
import { BASE_URL } from "../../serverURLs";
export default function DetailCard({ note }) {
  const navigate = useNavigate();

  const deleteNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/deleteNote/${note._id}`)
          .then(() => {
            navigate("/notes");
            Swal.fire("Deleted!", "Your Note has been deleted.", "success");
          })
          .catch((err) => console.error(err));
      } else {
        return;
      }
    });
  };

  const handleClose = () => {
    navigate("/notes"); // Redirect to /notes
  };

  return (
    <div className="note-details">
      <span className="closeBtn" onClick={handleClose}>X</span>
      <h1 className="title">{note.title}</h1>
      <p className="details">{note.details}</p>
      <div className="action">
        <Link className="btn blue" to={`/notes/edit/${note._id}`}>
          Edit
        </Link>
        <button className="btn red" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}
