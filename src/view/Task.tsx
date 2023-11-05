import controllerObj from "../controller/controller";

interface props {
  taskId: number;
  taskStatus: boolean;
}

function Task({ taskId, taskStatus }: props) {
  const taskObj = controllerObj.get_task_from_id(taskId);
  return (
    <li className="task-list-item enabled">
        <input className="task-list-item-checkbox" checked={taskStatus} type="checkbox" onChange={e => {}}/>
      {taskObj.text}
    </li>
  );
}

export default Task;
