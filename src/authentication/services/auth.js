import { getUserData } from "./storage"


export const isAuthenticated = () => {
    return getUserData() != null;
}

