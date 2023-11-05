import controllerObj from "../controller/controller";
import Task from "./Task";

interface props {
  dayEpoch: number;
  dayTasks: object[];
  monthMapping: string[];
  onTaskClick: (completionTime:number, creationTime:number, isDone:boolean, content:string)=>void;
}

function TaskDay({ dayEpoch, dayTasks, monthMapping, onTaskClick }: props) {
  dayEpoch = controllerObj.get_epoch_from_day(dayEpoch);
  const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formatDayFromEpoch = (epochTime: number) => {
    const dObj = new Date(epochTime);
    let res = dayMapping[dObj.getDay()];
    res += ", " + dObj.getDate();
    res += " " + monthMapping[dObj.getMonth()];
    res += " " + dObj.getFullYear();
    return res;
  };

  const getTask = (taskObj:any)=> {
    return <Task key={taskObj.taskId} taskId={taskObj.taskId} taskStatus={taskObj.taskStatus} onTaskClick={onTaskClick}></Task>;
  }
  return (
    <>
      <h2>{formatDayFromEpoch(dayEpoch)}</h2>
      <ul className="contains-task-list">
        {dayTasks.map(getTask)}
      </ul>
    </>
  );
}

export default TaskDay;
