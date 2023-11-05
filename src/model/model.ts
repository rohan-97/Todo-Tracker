const TASKS_KEY = "tasks";
const ACTIVE_TASKS_KEY = "activeTasks";
const HISTORY_KEY = "history";
const TOP_TASK_ID_KEY = "topTaskId";
const PERSISTENT_TASKS = "persistentTasks";

function get_tasks() {
  return _get_entry_from_local_storage(TASKS_KEY, {});
}
function set_tasks(entry: object) {
  return _set_entry_in_local_storage(TASKS_KEY, entry);
}

function get_persistent_tasks() {
  return _get_entry_from_local_storage(PERSISTENT_TASKS, []);
}
function set_persistent_tasks(entry: number[]) {
  return _set_entry_in_local_storage(PERSISTENT_TASKS, _removeDuplicates(entry));
}

function _removeDuplicates(arr:number[]) { 
  return [...new Set(arr)]; 
} 

function get_active_tasks() {
  return _get_entry_from_local_storage(ACTIVE_TASKS_KEY);
}
function set_active_tasks(entry: number[]) {
  return _set_entry_in_local_storage(ACTIVE_TASKS_KEY, entry);
}

function get_history() {
  return _get_entry_from_local_storage(HISTORY_KEY, {});
}
function set_history(entry: object) {
  return _set_entry_in_local_storage(HISTORY_KEY, entry);
}

function get_task_id() {
  return _get_entry_from_local_storage(TOP_TASK_ID_KEY, 0);
}
function set_task_id(value: number) {
  return _set_entry_in_local_storage(TOP_TASK_ID_KEY, value);
}

function _get_entry_from_local_storage(key: string, fallback: any = []) {
  let res = localStorage.getItem(key);
  if (res === null || res === "") {
    return fallback;
  }
  return JSON.parse(res);
}

function _set_entry_in_local_storage(key: string, value: object | number[] | number) {
  localStorage.setItem(key, JSON.stringify(value));
}

const modelObj = {
  get_tasks,
  set_tasks,
  get_active_tasks,
  set_active_tasks,
  get_history,
  set_history,
  get_task_id,
  set_task_id,
  get_persistent_tasks,
  set_persistent_tasks,
};

export default modelObj;