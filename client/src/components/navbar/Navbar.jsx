import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { BASE_URL } from "../../serverURLs";

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  };

  return (
    <div className="navbar">
      <div className="title">
        <span>
          <Link className="link" to="/">
            UPSC
            <img
              src="https://static.prepp.in/public/image/f3e1c036b1714cc508588ca8893f59eb.png?tr=w-321,h-512,c-force"
              alt=""
            />
            DIGEST
          </Link>
        </span>
      </div>
      {user ? (
        <>
          <div className="menuIcon">
            <img
              src="https://cdn.icon-icons.com/icons2/2506/PNG/512/menu_icon_150667.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className={open ? "menu active" : "menu"}>
            <span className="closeBtn" onClick={() => setOpen(false)}>X</span>
            <a href="/">Home</a>
            <a href="https://upsc.gov.in/sites/default/files/Notif-CSP-24-engl-140224.pdf">Notification</a>
            <Link className="link" to="/notes">Notes</Link>
            <a onClick={logout}>Logout</a>
          </div>
        </>
      ) : null}
      <hr />
    </div>
  );
};

export default Navbar;
