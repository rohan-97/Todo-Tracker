import "../css/App.css";
import Entry from "./Entry";
import controllerObj from "../controller/controller"
import { useState } from "react";

function App() {

  const [activeTasks, setActiveTasks] = useState(controllerObj.get_active_tasks_ids());
  const refreshActiveTasks = () => {
    setActiveTasks(controllerObj.get_active_tasks_ids());
  }

  const listenOnTextInput = (input:any) => {
    if(input.key === "Enter") {
      controllerObj.create_task(input.target.value, false);
      refreshActiveTasks();
      input.target.value = "";
    }
  } 

  const generateTaskEntry = (taskId:number) => {
    const taskObj = controllerObj.get_task_from_id(taskId);
    return <Entry key={taskId.toString()} id={taskId.toString()} text={taskObj.text} isDone={taskObj.isDone} onSelect={controllerObj.toggle_check} onDelete={(tId) => {controllerObj.remove_task_from_active_list(tId);refreshActiveTasks()}}/>
  }

  return (
    <>
      <div id="container">
        <h1>
          To Do List<i className="far fa-check-circle"></i>
        </h1>
        <input type="text" name="" placeholder="add a to-do" onKeyDown={listenOnTextInput}/>
        <ul>
          {activeTasks.map(generateTaskEntry)}
        </ul>
      </div>
    </>
  );
}

export default App;
