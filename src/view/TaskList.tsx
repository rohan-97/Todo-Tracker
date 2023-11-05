import controllerObj from "../controller/controller";
import TaskDay from "./TaskDay";

function TaskList() {
  let history = controllerObj.get_tasks_history();
  const todaysTasks = controllerObj.get_todays_task_object_list();
  if (todaysTasks.length !== 0)
    history[controllerObj.get_current_date_number()] = todaysTasks;
  const days = Object.keys(history).sort().reverse();
  const getDay = (day: string) => {
    return (
      <TaskDay key={day} dayEpoch={parseInt(day)} dayTasks={history[day]} />
    );
  };
  return days.map(getDay);
}

export default TaskList;
