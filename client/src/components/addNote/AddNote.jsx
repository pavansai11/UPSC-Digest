import { Link } from 'react-router-dom'
import './addNote.scss';

export default function AddNote() {
  return (
    <Link to={'/notes/add'}>
        <button className='addNote'>Add Note</button>
    </Link>
  )
}
