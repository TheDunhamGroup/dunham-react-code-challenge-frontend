import { useEffect, useState } from "react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

// The Header creates links that can be used to navigate.
const Header = () => (
  <header>
    <h1>Welcome to the Dunham React.js App!</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
      </ul>
    </nav>
  </header>
);

// The Home component has a button to reset the Users.
const Home = () => {
  function resetUsers(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fetch("https://manage.thedunhamgroup.com/aws-server/Reset").then((e) => {
      alert("Users reset.");
    });
  }
  return (
    <div>
      <p>If something goes wrong, press the button below to reset the users.</p>
      <button className="btn btn-primary" onClick={resetUsers}>
        Reset
      </button>
    </div>
  );
};

interface User {
  UserID: number;
  Email: string;
  ProfilePhoto: any;
  Name: string;
  Birthday: string;
}

// The Team components retrieves and renders a list of users.
const Team = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("FETCHING");
    fetch("https://manage.thedunhamgroup.com/aws-server/Team")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setUsers(result);
        },
        (request_error) => {
          console.error(request_error);
          setIsLoaded(true);
          setError(request_error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>Meet the Team:</h2>
        {users.map((user) => (
          <div
            key={user.UserID}
            className="row justify-content-start
  align-items-center my-3"
          >
            {user.ProfilePhoto && (
              <div className="col-md-3">
                <img className="profile-image" src={user.ProfilePhoto} />
              </div>
            )}
            <div className="col-md-9">
              <h3>
                {user.Name} - {user.Email}
              </h3>
              <p>{user.Birthday}</p>
              <p>{user.Biography}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

createRoot(document.getElementById("root")).render(
  <HashRouter basename="/">
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  </HashRouter>
);
