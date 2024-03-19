import { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";

export default function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);
  const { user } = useContext(StateContext);
  const handleLogOut = () => {
    appDispatch({ type: "LOG_OUT" });
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${user?.username}`} className="mr-2">
        <img
          className="small-header-avatar"
          src={user?.avatar}
          alt="user avatar"
        />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}
