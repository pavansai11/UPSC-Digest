import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../../components/detailCard/DetailCard";
import './notesPage.scss';
import { BASE_URL } from "../../serverURLs";

export default function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState({
    id: "",
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

  return (
    <div className="container">
      <DetailCard note={note} />
    </div>
  );
}
