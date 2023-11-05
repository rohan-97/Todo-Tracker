import controllerObj from "../controller/controller";
import Task from "./Task";

interface props {
  dayEpoch: number;
  dayTasks: object[];
}

function TaskDay({ dayEpoch, dayTasks }: props) {
  dayEpoch = controllerObj.get_epoch_from_day(dayEpoch);
  const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  const formatDayFromEpoch = (epochTime: number) => {
    const dObj = new Date(epochTime);
    let res = dayMapping[dObj.getDay()];
    res += ", " + dObj.getDate();
    res += " " + monthMapping[dObj.getMonth()];
    res += " " + dObj.getFullYear();
    return res;
  };

  const getTask = (taskObj:any)=> {
    return <Task key={taskObj.taskId} taskId={taskObj.taskId} taskStatus={taskObj.taskStatus}></Task>;
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
