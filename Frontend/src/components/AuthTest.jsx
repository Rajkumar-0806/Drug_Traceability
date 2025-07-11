// src/components/AuthTest.jsx
import { useAuth } from "../context/AuthContext";

export const AuthTest = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading authentication state...</div>;
  
  return (
    <div>
      <h2>Authentication Test</h2>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};