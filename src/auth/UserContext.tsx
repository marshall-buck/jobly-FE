import { createContext } from "react";
import { UserContextInterface } from "../interfaces";


const UserContext = createContext<UserContextInterface>({user: null, token: null});

export default UserContext;