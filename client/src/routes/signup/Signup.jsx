import { useState } from "react";
import Google from "../../images/google.png";
import Github from "../../images/github.png";
import "./signup.scss";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../serverURLs";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 201) {
        navigate("/login");
      } else {
        throw new Error("Signup failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const google = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const github = () => {
    window.open(`${BASE_URL}/auth/github`, "_self");
  };

  return (
    <div className="signup">
      <h1 className="signupTitle">Choose a Signup Method</h1>
      <div className="wrapper">
        <div className="top">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit" onClick={handleSignup}>
            Signup
          </button>
          <Link to="/login">Already a User, Login?</Link>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="bottom">
          <div className="signupButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Continue with Google
          </div>
          <div className="signupButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Continue with Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
