import axios from "axios";
import { useState } from "react";

interface IProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function HeaderLoggedOut({ setLoggedIn }: IProps) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("/login", user);
      console.log(response.data);
      if (response.data) {
        setLoggedIn(true);
        localStorage.setItem("social-app-token", response.data.token);
        localStorage.setItem("social-app-avatar", response.data.avatar);
        localStorage.setItem("social-app-username", response.data.username);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}
