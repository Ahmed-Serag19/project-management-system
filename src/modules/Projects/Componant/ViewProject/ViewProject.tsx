import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import projectImage from "../../../../assets/home-bg.png";

// ViewProject.tsx
interface ViewProjectProps {
  projectTitle: string;
  projectDescription: string;
  projectTasks: number;
  projectCreationDate?: string; // Made optional
}

function ViewProject({
  projectTitle,
  projectDescription,
  projectTasks,
  projectCreationDate, // Keep this as it is used within the component
}: ViewProjectProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <p>Project Title: {projectTitle}</p>
              <p>Project Description: {projectDescription}</p>
              <p>Number Of Tasks: {projectTasks}</p>
              {projectCreationDate && (
                <p>Creation Date: {projectCreationDate}</p>
              )}
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
