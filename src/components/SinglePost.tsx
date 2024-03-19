import { useEffect, useState } from "react";
import Page from "./Page";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Post } from "./ProfilePosts";
import LoadingDotsIcon from "./LoadingDotsIcon";
import { formatDate } from "../utils";

import ReactMarkdown from "react-markdown";

export default function SinglePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({} as Post);
  const { id } = useParams();

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });

        setPost(response.data);
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
  }, [id]);

  if (isLoading) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {formatDate(post.createdDate)}
      </p>

      <div className="body-content">
        <ReactMarkdown
          children={post.body}
          allowedElements={[
            "p",
            "br",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "li",
            "ol",
            "strong",
            "em",
            "a",
            "img",
          ]}
        />
      </div>
    </Page>
  );
}
