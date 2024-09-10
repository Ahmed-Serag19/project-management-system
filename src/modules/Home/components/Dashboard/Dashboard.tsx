import DashboardSection from "../DashboardSection/DashboardSection";
import { FaUserAltSlash, FaUserAlt } from "react-icons/fa";
import { LuListTodo, LuListChecks, LuLayoutList } from "react-icons/lu";

import { Task_URLs, User_URls } from "../../../../constants/End_Points";
import axiosInstance from "../../../../utils/axiosInstance";
import { useEffect, useState } from "react";

interface UsersStatus {
  active: number;
  inactive: number;
}

interface TasksStatus {
  toDo: number;
  inProgress: number;
  done: number;
}

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState<UsersStatus>({
    active: 0,
    inactive: 0,
  });

  const [tasksStatus, setTasksStatus] = useState<TasksStatus>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  const { getUsersCount } = User_URls;
  const { getTasksCount } = Task_URLs;

  const getUsersStatus = async () => {
    try {
      const response = await axiosInstance.get(getUsersCount);
      const activeUsers = response.data.activatedEmployeeCount || 0;
      const inactiveUsers = response.data.deactivatedEmployeeCount || 0;
      return { active: activeUsers, inactive: inactiveUsers };
    } catch (error) {
      console.error("Error fetching users status:", error);
      return { active: 8, inactive: 3 };
    }
  };

  const getTasksStatus = async () => {
    try {
      const response = await axiosInstance.get(getTasksCount);
      const toDoTasks = response.data.toDo || 0;
      const inProgressTasks = response.data.inProgress || 0;
      const doneTasks = response.data.done || 0;
      return { toDo: toDoTasks, inProgress: inProgressTasks, done: doneTasks };
    } catch (error) {
      console.error("Error fetching tasks status:", error);
      return { toDo: 0, inProgress: 0, done: 0 };
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      const userStatus = await getUsersStatus();
      setUserStatus(userStatus);

      const taskStatus = await getTasksStatus();
      setTasksStatus(taskStatus);
    };

    fetchStatuses();
  }, []);

  const taskCards = [
    {
      icon: <LuLayoutList />,
      label: "Tasks To Do",
      value: tasksStatus.toDo,
      backgroundColor: "#e5e6f4",
      iconBackgroundColor: "#cfd1ec",
    },
    {
      icon: <LuListTodo />,
      label: "Tasks In Progress",
      value: tasksStatus.inProgress,
      backgroundColor: "#f4f4e5",
      iconBackgroundColor: "#e4e4bc",
    },
    {
      icon: <LuListChecks />,
      label: "Completed Tasks",
      value: tasksStatus.done,
      backgroundColor: "#FFEBEE",
      iconBackgroundColor: "#F9D3C5",
    },
  ];

  const userCards = [
    {
      icon: <FaUserAlt />,
      label: "Active Users",
      value: userStatus.active,
      backgroundColor: "#e5e6f4",
      iconBackgroundColor: "#cfd1ec",
    },
    {
      icon: <FaUserAltSlash />,
      label: "Inactive Users",
      value: userStatus.inactive,
      backgroundColor: "#f4f4e5",
      iconBackgroundColor: "#e4e4bc",
    },
  ];

  return (
    <div className="dashboard col-md-5">
      <DashboardSection
        title="Tasks"
        description="Shows how many tasks"
        cards={taskCards}
      />
      <DashboardSection
        title="Users"
        description="Shows how many active and inactive Users"
        cards={userCards}
      />
    </div>
  );
};

export default Dashboard;
