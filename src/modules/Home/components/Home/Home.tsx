import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import "../../home.css";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }

  const { user } = authContext as AuthContextType;

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="m-5">
      <main>
        <div className="banner-container">
          <h1>
            Welcome <span>{user?.userName}</span>
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
