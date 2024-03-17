import { BrowserRouter, Route, Routes } from "react-router-dom";

// Our Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Terms from "./components/Terms";
import About from "./components/About";
import { useState } from "react";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import FlashMessage from "./components/FlashMessage";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("social-app-token")!)
  );

  const [flashMessage, setFlashMessage] = useState<string>("");

  function addFlashMessage(message: string) {
    return setFlashMessage(message);
  }

  return (
    <BrowserRouter>
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <FlashMessage flashMessage={flashMessage} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route
          path="/create-post"
          element={<CreatePost addFlashMessage={addFlashMessage} />}
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
