import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

interface DecodedToken {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  iat: number;
  exp: number;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Function to save the token and decode it
  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode<DecodedToken>(token);
    setUser(decodedUser);
  };

  const clearToken = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      saveToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, saveToken, clearToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
