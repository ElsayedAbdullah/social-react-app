import { useRef } from "react";
import Page from "./Page";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  addFlashMessage: (message: string) => void;
}

export default function CreatePost({ addFlashMessage }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/create-post", {
        title: inputRef.current?.value,
        body: textareaRef.current?.value,
        token: localStorage.getItem("social-app-token"),
      });

      navigate(`/post/${response.data}`);
      addFlashMessage("Post created successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            ref={inputRef}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            ref={textareaRef}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}
