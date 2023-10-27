import { get_tasks, set_tasks, get_active_tasks, get_history, set_active_tasks, set_history, get_task_id, set_task_id } from './model.js';

const MILLI_SECONDS_IN_A_DAY = 86400000;
function create_task(text, is_done=false) {
    let id = get_task_id()
    id++
    let tasks = get_tasks()
    tasks[id] = {
        "isDone": is_done,
        "text": text,
        "creationTime": _get_current_time_in_epoch(),
        "completionTime": (is_done)?_get_current_time_in_epoch():null
    }
    set_tasks(tasks)
    set_task_id(id)
    let active_tasks = get_active_tasks()
    active_tasks.unshift(id)
    set_active_tasks(active_tasks)
    return _populate_task_data(id)
}

function _get_current_time_in_epoch() {
    return Date.now()
}

function _get_current_date_number() {
    let current_epoch = _get_current_time_in_epoch()
    let current_date = Math.floor(current_epoch/MILLI_SECONDS_IN_A_DAY)
    console.log("Current_epoch: "+current_epoch)
    console.log("Current_date: "+current_date)
    return current_date
}

function toggle_check(task_id) {
    let tasks = get_tasks()
    tasks[task_id].completionTime = (tasks[task_id].isDone)?null:_get_current_time_in_epoch();
    tasks[task_id].isDone = !tasks[task_id].isDone;
    set_tasks(tasks)
}

function remove_task_from_active_list(task_id) {
    let active_tasks = get_active_tasks()
    active_tasks = active_tasks.filter(t_id=>t_id!=task_id)
    set_active_tasks(active_tasks)
}

function list_active_tasks() {
    let tasks = get_tasks()
    let active_tasks = get_active_tasks()
    return active_tasks.map(_populate_task_data)
}

function _populate_task_data(task_id) {
    let tasks = get_tasks()
    let temp_obj = tasks[task_id]
    temp_obj.id = task_id
    return temp_obj
}

function clean_yesterdays_tasks() {
    let today = _get_current_date_number()
    let tasks = get_tasks()
    let history = get_history()
    if(history.hasOwnProperty(today-1)){
        return
    }
    history[today-1] = get_active_tasks()
    set_active_tasks(get_active_tasks().filter(task_id => tasks[task_id].isDone!=true))
    set_history(history)
}

export { create_task, remove_task_from_active_list, list_active_tasks, toggle_check, clean_yesterdays_tasks };