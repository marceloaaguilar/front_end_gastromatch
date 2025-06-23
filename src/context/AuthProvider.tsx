import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../lib/interfaces";
import { getServerUrl } from '../utils/env';

interface AuthContextType {
  user: UserProps | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${getServerUrl()}/api/users/verify-token`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {

        if (res.ok) {
          const data = await res.json();

          const {id, name, email, phone, address, profile_photo, role} = data.user;

          setUser({
            id: id,
            nome: name,
            email: email,
            telefone: phone,
            endereco: address,
            photo: profile_photo,
            type: role
          });

        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);


  const logout = async () => {
    await fetch(`${getServerUrl()}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  const login = async (credentials: { email: string; password: string }) => {
    
    try {
        
        const res = await fetch(`${getServerUrl()}/api/users/signin`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.message || "Login failed");
        }

        const data = await res.json();

        const {id, name, email, phone, address, profile_photo, role} = data.user;

        setUser({
            id: id,
            nome: name,
            email: email,
            telefone: phone,
            endereco: address,
            photo: profile_photo,
            type: role
        });

        navigate("/");

    } catch (err: any) {
      throw new Error(err || "Ocorreu um erro desconhecido.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
