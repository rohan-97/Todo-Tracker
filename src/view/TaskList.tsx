import { Button, Modal } from "react-bootstrap";
import controllerObj from "../controller/controller";
import TaskDay from "./TaskDay";
import { useState } from "react";

function TaskList() {
  let history = controllerObj.get_tasks_history();
  const todaysTasks = controllerObj.get_todays_task_object_list();
  if (todaysTasks.length !== 0)
    history[controllerObj.get_current_date_number()] = todaysTasks;
  const days = Object.keys(history).sort().reverse();
  const getDay = (day: string) => {
    return (
      <TaskDay key={day} dayEpoch={parseInt(day)} dayTasks={history[day]} monthMapping={monthMapping} onTaskClick={handleShowTaskModal} />
    );
  };

  const defaultTask = {
    "content" : "Design for bundling 2 different pages by WebPack builder",
    "completionTime" : 0,
    "creationTime" : 0,
    "isDone": false,
    "showTask": false
  }

  const monthMapping = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [taskDetails, setTaskDetails] = useState(defaultTask);
  const handleCloseModal = () => setTaskDetails({
    "content" : "",
    "completionTime" : 0,
    "creationTime" : 0,
    "isDone": false,
    "showTask": false
  });
  const getTimeFromEpoch = (epochTime:number) => {
    const dobj = new Date(epochTime);
    const hr = dobj.getHours();
    const am = (hr > 12)?" AM ":" PM ";
    const min = dobj.getMinutes();
    const date = dobj.getDate();
    const month = monthMapping[dobj.getMonth()];
    const year = dobj.getFullYear();
    return hr+":"+min+am+date+" "+month+" "+year;
  }
  const handleShowTaskModal = (completionTime:number, creationTime:number, isDone:boolean, content:string) => {
        setTaskDetails({
        "content" : content,
        "completionTime" : completionTime,
        "creationTime" : creationTime,
        "isDone": isDone,
        "showTask": true
      });
    };

  return (
    <>
      <Modal show={taskDetails.showTask} onHide={handleCloseModal} centered className="squared">
        <Modal.Header closeButton>
            <span className="modal-status-icon"><i className={(taskDetails.isDone)?"fa-solid fa-circle-check fa-2x":"fa-solid fa-circle-xmark fa-2x"}></i></span>
          <Modal.Title id="contained-modal-title-vcenter">{taskDetails.content}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>Created on: {getTimeFromEpoch(taskDetails.creationTime)}</li>
                {(taskDetails.isDone)?<li>Completed on: {getTimeFromEpoch(taskDetails.completionTime)}</li>:""}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {days.map(getDay)}
    </>
  );
}

export default TaskList;
