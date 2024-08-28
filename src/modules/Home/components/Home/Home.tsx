import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { useContext } from "react";
import "../../home.css";
import Dashboard from "../Dashboard/Dashboard";
const Home = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }
  const { user, clearToken } = authContext as AuthContextType; //+

  console.log(user, clearToken);
  return (
    <section>
      <main>
        <div className="banner-container">
          <h1>
            Welcome <span>{user?.userName}</span>{" "}
          </h1>
          <h2>You can add project and assign tasks to your team</h2>
        </div>
        <div className="home-content">
          <Dashboard />
        </div>
      </main>
    </section>
  );
};

export default Home;
