import { Dispatch, createContext } from "react";
import { Action } from "../types";

const DispatchContext = createContext<Dispatch<Action>>(() => {});

export default DispatchContext;
