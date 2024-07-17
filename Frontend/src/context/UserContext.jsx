import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
import axios from "axios";
import Cookies from "js-cookie"; // Assuming you are using js-cookie for cookie management
// import { useHistory } from "react-router-dom"; // Assuming you are using react-router-dom for navigation

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setUser(null);
        // history.push("/login"); // Redirect to login page if unauthorized
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
