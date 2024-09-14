import axios from "axios";
import React, { useEffect, useState } from "react";
import { Task_URLs } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
type UserTask = {
  id: string;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
};
type UserTasks = UserTask[];

export default function TaskUser() {
  const [tasks, setTasks] = useState<UserTasks>([]);

  const getUserTask = React.useCallback(async () => {
    try {
      let response = await axios.get<{ data: UserTasks }>(
        Task_URLs.getAllAssigned,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageSize: 100,
            pageNumber: 1,
          },
        }
      );
      setTasks(response.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  return (
    <div>
      <div>
        {tasks.length>0 ? <div className="row mx-2 my-5 pt-3 gx-2">
          <Colum
            refetchusers={getUserTask}
            title={"ToDo"}
            tUser={tasks.filter((task) => task.status == "ToDo")}
          />
          <Colum
            refetchusers={getUserTask}
            title={"InProgress"}
            tUser={tasks.filter((task) => task.status == "InProgress")}
          />
          <Colum
            refetchusers={getUserTask}
            title={"Done"}
            tUser={tasks.filter((task) => task.status == "Done")}
          />
        </div>
        
        : <NoData/>}

      </div>
    </div>
  );
}
const Colum = ({
  title,
  tUser,
  refetchusers,
}: {
  refetchusers: () => Promise<void>;
  title: string;
  tUser: UserTasks;
}) => {
  const changeTaskStatus = React.useCallback(
    async ({ taskId, newStatus }: { taskId: string; newStatus: string }) => {
      try {
        await axios.put(
          Task_URLs.changeStatus(taskId),
          {
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Task status updated successfully");
        refetchusers();
      } catch (error) {}
    },
    [refetchusers]
  );

  return (
    <div className="col-md-4 cards rounded-4 gap-1">
      <p className="title ms-2 mb-4">{title}</p>
      <div
        className="rounded-4 bg-dark-green d-flex flex-column gap-3"
        onDrop={(e) => {
          e.preventDefault();
          const taskId = e.dataTransfer.getData("taskId");
          const previousStatus = e.dataTransfer.getData("previousStatus");
          if (previousStatus == title) return;

          changeTaskStatus({ taskId, newStatus: title });
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {tUser.map(({ id, title: titleCard }) => (
          <div
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", id);
              e.dataTransfer.setData("previousStatus", title);
              console.log("start");
            }}
            onDragEnd={() => {
              console.log("end");
            }}
            className="task rounded-2 text-white "
          >
            <p>{titleCard}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
