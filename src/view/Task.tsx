import controllerObj from "../controller/controller";

interface props {
  taskId: number;
  taskStatus: boolean;
  onTaskClick: (completionTime:number, creationTime:number, isDone:boolean, content:string)=>void;
}

function Task({ taskId, taskStatus, onTaskClick}: props) {
  const taskObj = controllerObj.get_task_from_id(taskId);
  return (
    <li className="task-list-item enabled">
        <input className="task-list-item-checkbox" checked={taskStatus} type="checkbox" onChange={() => {}}/>
      <span className="task-entry" onClick={()=>{onTaskClick(taskObj.completionTime, taskObj.creationTime,taskObj.isDone, taskObj.text)}}>{taskObj.text}</span>
    </li>
  );
}

export default Task;
