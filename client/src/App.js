import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./routes/homePage/HomePage.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./routes/login/Login.jsx";
import Signup from "./routes/signup/Signup.jsx";
import NotesPage from "./routes/notesPage/NotesPage.jsx";
import { useEffect, useState } from "react";
import AddForm from "./routes/notesPage/AddForm.jsx";
import NoteDetails from "./routes/notesPage/NoteDetails.jsx";
import EditForm from "./routes/notesPage/EditForm.jsx";
import { BASE_URL } from "./serverURLs.js";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/auth/login/success`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/notes"
            element={user ? <NotesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/add"
            element={user ? <AddForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/details/:id"
            element={user ? <NoteDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/edit/:id"
            element={user ? <EditForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
