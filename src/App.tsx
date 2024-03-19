import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useImmerReducer } from "use-immer";

// Our Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Terms from "./components/Terms";
import About from "./components/About";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import FlashMessage from "./components/FlashMessage";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import { Action } from "./types";
import { useEffect } from "react";
import Profile from "./components/Profile";

interface State {
  loggedIn: boolean;
  flashMessages: string[];
  user: {
    token: string;
    username: string;
    avatar: string;
  };
}

const initialState: State = {
  loggedIn: Boolean(localStorage.getItem("social-app-token")),
  flashMessages: [],
  user: {
    token: localStorage.getItem("social-app-token")!,
    username: localStorage.getItem("social-app-username")!,
    avatar: localStorage.getItem("social-app-avatar")!,
  },
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "LOG_IN":
      state.loggedIn = true;
      state.user = action.payload;
      return;
    case "LOG_OUT":
      state.loggedIn = false;
      return;
    case "FLASH_MESSAGE":
      state.flashMessages.push(action.payload as string);
      return;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("social-app-token", state.user.token);
      localStorage.setItem("social-app-username", state.user.username);
      localStorage.setItem("social-app-avatar", state.user.avatar);
    } else {
      localStorage.removeItem("social-app-token");
      localStorage.removeItem("social-app-avatar");
      localStorage.removeItem("social-app-username");
    }
  }, [state.loggedIn, state.user]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <FlashMessage flashMessages={state.flashMessages} />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
