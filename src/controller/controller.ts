import modelObj from "../model/model";

const MILLI_SECONDS_IN_A_DAY = 86400000;
function create_task(text: string, is_done: boolean=false) {
  let id = modelObj.get_task_id();
  id++;
  let tasks = modelObj.get_tasks();
  tasks[id] = {
    isDone: is_done,
    text: text,
    creationTime: _get_current_time_in_epoch(),
    completionTime: is_done ? _get_current_time_in_epoch() : null,
  };
  modelObj.set_tasks(tasks);
  modelObj.set_task_id(id);
  let active_tasks = modelObj.get_active_tasks();
  active_tasks.unshift(id);
  modelObj.set_active_tasks(active_tasks);
  return _populate_task_data(id);
}

function get_active_tasks_ids() {
  return modelObj.get_active_tasks();
}

function get_task_from_id(task_id:number) {
  return modelObj.get_tasks()[task_id]
}

function _get_current_time_in_epoch() {
  return Date.now();
}

function get_current_date_number() {
  let current_epoch = _get_current_time_in_epoch();
  let current_date = Math.floor(current_epoch / MILLI_SECONDS_IN_A_DAY);
  return current_date;
}

function toggle_check(task_id: number) {
  let tasks = modelObj.get_tasks();
  tasks[task_id].completionTime = tasks[task_id].isDone
    ? null
    : _get_current_time_in_epoch();
  tasks[task_id].isDone = !tasks[task_id].isDone;
  modelObj.set_tasks(tasks);
}

function delete_task_entry(task_id: number) {
  let active_tasks = modelObj.get_active_tasks();
  active_tasks = active_tasks.filter((t_id: number) => t_id != task_id);
  modelObj.set_active_tasks(active_tasks);
  let tasks = modelObj.get_tasks()
  delete tasks[task_id]
  modelObj.set_tasks(tasks)
}

function list_active_tasks() {
  let active_tasks = modelObj.get_active_tasks();
  return active_tasks.map(_populate_task_data);
}

function _populate_task_data(task_id: number) {
  let tasks = modelObj.get_tasks();
  let temp_obj = tasks[task_id];
  temp_obj.id = task_id;
  return temp_obj;
}

function get_tasks_history() {
  return modelObj.get_history()
}

function get_epoch_from_day(epoch_day:number) {
  return epoch_day*MILLI_SECONDS_IN_A_DAY
}

function _prepare_task_obj(task_id:number) {
  return {
    "taskId": task_id,
    "taskStatus": get_task_from_id(task_id).isDone
  }
}

function get_todays_task_object_list() {
  return modelObj.get_active_tasks().map(_prepare_task_obj)
}

function clean_yesterdays_tasks() {
  let today = get_current_date_number();
  let tasks = modelObj.get_tasks();
  let history = modelObj.get_history();
  if (history.hasOwnProperty(today - 1)) {
    return;
  }
  const active_tasks = modelObj.get_active_tasks();
  if(active_tasks.length === 0)
    return;
  history[today - 1] = active_tasks.map(_prepare_task_obj);
  modelObj.set_active_tasks(
    active_tasks.filter((task_id: number) => tasks[task_id].isDone != true)
  );
  modelObj.set_history(history);
}

const controllerObj = {
  create_task,
  delete_task_entry,
  list_active_tasks,
  toggle_check,
  clean_yesterdays_tasks,
  get_task_from_id,
  get_active_tasks_ids,
  get_tasks_history,
  get_epoch_from_day,
  get_current_date_number,
  get_todays_task_object_list,
};
export default controllerObj;
