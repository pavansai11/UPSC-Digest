import { useState, useEffect } from "react";
import Google from "../../images/google.png";
import Github from "../../images/github.png";
import "./login.scss";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../serverURLs";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/login/success`, {
          credentials: "include",
        });
        const resData = await res.json();
        if (res.status === 200 && resData.user) {
          setUser(resData.user);
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, [setUser, navigate]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const resData = await res.json();

      if (res.status === 200) {
        setUser(resData.user);
        navigate("/");
      } else {
        throw new Error(resData.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
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
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
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
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
          {error && <p className="error">{error}</p>}
          <Link to="/signup">New User, Signup?</Link>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="bottom">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Continue with Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Continue with Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
