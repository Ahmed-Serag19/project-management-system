// TasksList.tsx
import { useState, useEffect, useContext } from "react";
import { Table, Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import CustomToggle from "./CustomToggle";
import { Task_URLs } from "../../../constants/End_Points";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";

interface Task {
  id: number;
  title: string;
  status: string;
  user: string;
  project: string;
  creationDate: string;
}

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { getAllForManager } = Task_URLs;
  const { token } = useContext(AuthContext) || {};

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(getAllForManager);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  // const handleDelete = async () => {
  //   if (selectedTaskId !== null) {
  //     setDeleteLoading(true);
  //     try {
  //       await axiosInstance.delete(deleteTaskUrl(selectedTaskId));
  //       fetchTasks();
  //     } catch (error) {
  //       console.error("Failed to delete task", error);
  //     } finally {
  //       setDeleteLoading(false);
  //     }
  //   }
  // };

  return (
    <section className="tasks-list py-3">
      <Container fluid>
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="font-semibold mt-6">Tasks Table Details</h5>
                <p className="mb-4">Overview of all assigned tasks</p>
              </div>
              <div className="d-flex">
                <Button variant="success" className="mt-3" href="/add-task">
                  Add New Task
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p>Loading...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <p>No Data!</p>
              </div>
            ) : (
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>User</th>
                    <th>Project</th>
                    <th>Date Created</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>{task.user}</td>
                      <td>{task.project}</td>
                      <td>{task.creationDate}</td>
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">View</Dropdown.Item>
                            <Dropdown.Item href="#">Edit</Dropdown.Item>
                            <Dropdown.Item
                            // onClick={() => handleShowDeleteModal(task.id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TasksList;
