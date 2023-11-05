import Entry from "./Entry";
import controllerObj from "../controller/controller"
import { useState } from "react";
import HistorySidebar from "./HistorySidebar";

function App() {

  controllerObj.clean_yesterdays_tasks()

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
    return <Entry key={taskId.toString()} id={taskId.toString()} text={taskObj.text} isDone={taskObj.isDone} onSelect={controllerObj.toggle_check} onDelete={(tId) => {controllerObj.delete_task_entry(tId);refreshActiveTasks()}}/>
  }

  return (
    <>
      <HistorySidebar/>
      <div id="container" className="todo-container">
        <h1 className="todo-h1">
          To Do List<span className="right-floater"><i className="far fa-check-circle"></i></span>
        </h1>
        <input className="todo-input" type="text" name="" placeholder="add a to-do" onKeyDown={listenOnTextInput}/>
        <ul className="todo-ul">
          {activeTasks.map(generateTaskEntry)}
        </ul>
      </div>
    </>
  );
}

export default App;
