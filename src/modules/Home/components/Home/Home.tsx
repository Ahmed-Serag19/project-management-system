import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { useContext } from "react";
import "../../home.css";
import Dashboard from "../Dashboard/Dashboard";
const Home = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }
  const { user } = authContext as AuthContextType;

  return (
    <section className="m-5">
      <main>
        <div className="banner-container">
          <h1>
            Welcome <span>{user?.userName}</span>{" "}
          </h1>
          <h2>You can add project and assign tasks to your team</h2>
        </div>
        {user?.group.name === "Manager" && (
          <div className="home-content">
            <Dashboard />
          </div>
        )}
      </main>
    </section>
  );
};

export default Home;
