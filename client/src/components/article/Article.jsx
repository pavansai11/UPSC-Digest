import "./article.scss";
import React from "react";
import Notes from "../../images/notes.png";
import { Link } from "react-router-dom";

const Article = ({ label, title, time, url }) => (
  <div className="article">
    {label && <p className="label">{label}</p>}
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
    {time && <p className="time">{time}</p>}
    <div className="notes">
      <p>
        <i>Make a Note</i>
      </p>
      <Link to={"/notes/add"} state={{ prefilledTitle: title }}>
        <img src={Notes} alt="" />
      </Link>
    </div>
  </div>
);

export default Article;
