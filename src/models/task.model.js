import {tasks} from "../mock/data.js";

export default class TaskModel {
    #boardtasks = tasks;

    get tasks() {
        return this.#boardtasks;
    }
}
