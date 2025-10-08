import {tasks} from "../mock/data.js";

export default class TaskModel {
    #boardtasks = tasks;

    getTasks(){
        return this.#boardtasks;
    }
}
