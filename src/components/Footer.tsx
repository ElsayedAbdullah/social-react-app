import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-top text-center small text-muted py-3">
      <div className="container d-flex justify-content-between flex-wrap">
        <p className="m-0">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <a href="/" className="text-muted">
            ComplexApp
          </a>
          . All rights reserved.
        </p>
        <p>
          <Link to="/" className="mx-1">
            Home
          </Link>{" "}
          |{" "}
          <Link className="mx-1" to="/about-us">
            About Us
          </Link>{" "}
          |{" "}
          <Link className="mx-1" to="/terms">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
