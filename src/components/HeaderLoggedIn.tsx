import { Link } from "react-router-dom";

interface IProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function HeaderLoggedIn({ setLoggedIn }: IProps) {
  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("social-app-token");
    localStorage.removeItem("social-app-username");
    localStorage.removeItem("social-app-avatar");
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
      <a href="#" className="mr-2">
        <img
          className="small-header-avatar"
          src={localStorage.getItem("social-app-avatar")!}
        />
      </a>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}
