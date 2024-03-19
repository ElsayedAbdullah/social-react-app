import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils";
import LoadingDotsIcon from "./LoadingDotsIcon";

export interface Post {
  _id: string;
  author: {
    username: string;
    avatar: string;
  };
  title: string;
  body: string;
  createdDate: Date;
}

export default function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token,
        });
        console.log(response.data);

        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message); // Handle Axios errors
        } else {
          console.error(error); // Handle other types of errors
        }
      }
    }
    fetchPosts();

    // Cleanup function
    return () => {
      ourRequest.cancel();
    };
  }, [username]);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <div className="list-group">
      {posts.length ? (
        posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img
              className="avatar-tiny"
              src={post.author.avatar}
              alt="Example Post Avatar"
            />{" "}
            <strong>{post.title} </strong>
            <span className="text-muted small">
              on {formatDate(post.createdDate)}{" "}
            </span>
          </Link>
        ))
      ) : (
        <p className="mt-3 text-center text-muted">No posts yet</p>
      )}
    </div>
  );
}
