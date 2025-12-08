import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = localStorage.getItem("token"); // or user ID, email , etc.

  if (!user) {
    return <Navigate to="/" />; // redirect to Login
  }

  return children;
}
