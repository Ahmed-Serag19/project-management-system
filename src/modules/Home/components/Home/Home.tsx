
import {
  AuthContext,
  AuthContextType,
} from '../../../../context/AuthContext';
import { useContext } from 'react';

const Home = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }
  const { user, clearToken } = authContext as AuthContextType; //+

  console.log(user, clearToken);
  return (
    <div>
      <h1>Welcome, {user?.userName}</h1>
      <p>Email: {user?.userEmail}</p>
      <p>User Group: {user?.userGroup}</p>
      <p>Roles: {user?.roles.join(', ')}</p>
      <button onClick={() => clearToken()}>Logout</button>
    </div>
  );
};

export default Home;
