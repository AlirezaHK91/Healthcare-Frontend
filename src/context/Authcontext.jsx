import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  user: null,
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  const logout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/logout`);

      const cookies = response.headers["set-cookie"];
      if (cookies) {
        cookies.forEach((cookie) => {
          document.cookie = cookie;
        });
      }

      dispatch({
        type: "LOGOUT",
      });

      window.localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
