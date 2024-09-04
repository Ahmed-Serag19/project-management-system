import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User_URls } from "../constants/End_Points";

export interface AuthContextType {
  token: string | null;
  user: DecodedUser | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

interface Group {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

interface DecodedUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group: Group;
  creationDate: string;
  modificationDate: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { getCurrentUser } = User_URls;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedUser | null>(null);

  const saveToken = async (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);

    try {
      const response = await axios.get<DecodedUser>(getCurrentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      clearToken();
    }
  };

  const clearToken = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      saveToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
