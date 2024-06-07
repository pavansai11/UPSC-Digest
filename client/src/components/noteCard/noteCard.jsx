import { Link } from "react-router-dom";
import './noteCard.scss';

export default function NoteCard({note}) {
    return (
        <div className="noteCard">
            <h2 className="title">
                <Link to={`/notes/details/${note._id}`} style={{textDecoration: 'none', color: '#0F2C59'}}>{note.title}</Link>
                <Link to={`/notes/details/${note._id}`} style={{color: 'gray'}}><i className="fa-solid fa-ellipsis-vertical"></i></Link>
            </h2>
            <p className="details">
                {note.details}
            </p>
        </div>
    );
}
