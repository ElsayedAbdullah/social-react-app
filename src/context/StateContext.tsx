import { createContext } from "react";
interface initialState {
  loggedIn: boolean;
  flashMessages: string[];
  user?: {
    token: string;
    username: string;
    avatar: string;
  };
}

const initialState: initialState = {
  loggedIn: false,
  flashMessages: [],
  user: undefined,
};

const StateContext = createContext(initialState);

export default StateContext;
