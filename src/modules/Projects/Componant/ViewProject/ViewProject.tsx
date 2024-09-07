import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import projectImage from "../../../../assets/home-bg.png";

interface ViewProjectProps {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  projectTasks: number;
  projectCreationDate: string;
}

function ViewProject({
  projectId,
  projectTitle,
  projectDescription,
  projectTasks,
}: ViewProjectProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(projectId);
  console.log(projectTitle);
  console.log(projectDescription);
  console.log(projectTasks);

  return (
    <>
      <Button
        className="bg-white text-black border-0 ps-0 viewBottom"
        onClick={handleShow}
      >
        View
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={projectImage} alt="img to view project" />

            <div className="mt-3">
              <p>project Title: {projectTitle}</p>
              <p>project Id: {projectId}</p>
              <p>project Description: {projectDescription}</p>
              <p>Number Of Tasks: {projectTasks}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewProject;
