import {tasks} from "../mock/data.js";
import {generateId} from "../utils.js";

export default class TaskModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateId(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    deleteItems() {
        console.log(this.#boardtasks);
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== "trash");
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}
