import DashboardSection from "../DashboardSection/DashboardSection";
import { FaChartBar, FaClipboardList, FaProjectDiagram } from "react-icons/fa";

const Dashboard = () => {
  const taskCards = [
    {
      icon: <FaChartBar />,
      label: "Progress",
      value: "$ 7328.32",
      backgroundColor: "#e5e6f4",
      iconBackgroundColor: "#cfd1ec",
    },
    {
      icon: <FaClipboardList />,
      label: "Tasks Number",
      value: 1293,
      backgroundColor: "#f4f4e5",
      iconBackgroundColor: "#e4e4bc",
    },
    {
      icon: <FaProjectDiagram />,
      label: "Projects Number",
      value: 32,
      backgroundColor: "#FFEBEE",
      iconBackgroundColor: "#F9D3C5",
    },
  ];

  const userCards = [
    {
      icon: <FaChartBar />,
      label: "active",
      value: "$ 7328.32",
      backgroundColor: "#e5e6f4",
      iconBackgroundColor: "#cfd1ec",
    },
    {
      icon: <FaClipboardList />,
      label: "inactive",
      value: 1293,
      backgroundColor: "#f4f4e5",
      iconBackgroundColor: "#e4e4bc",
    },
  ];

  return (
    <div className="dashboard">
      <DashboardSection
        title="Tasks"
        description="Lorem ipsum dolor sit amet, consectetur"
        cards={taskCards}
      />
      <DashboardSection
        title="Users"
        description="Lorem ipsum dolor sit amet, consectetur"
        cards={userCards}
      />
    </div>
  );
};

export default Dashboard;
