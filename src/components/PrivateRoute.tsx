import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;