import {tasks} from "../mock/data.js";
import {generateId} from "../utils.js";
import Observable from "../framework/observable.js";
import {UpdateType, UserAction} from "../constants/const.js";

export default class TaskModel extends Observable {
    #boardtasks = tasks;
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            this.#boardtasks = await this.#tasksApiService.tasks;
        } catch(err) {
            this.#boardtasks = [];
        }

        this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#boardtasks;
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateId(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    async updateTaskStatus({taskId, preferId, newStatus}) {

        const task = this.#boardtasks.find(task => task.id.toString() === taskId);
        this.#boardtasks = this.#boardtasks.filter(task => task.id.toString() !== taskId);

        if (task) {
            const previousStatus = task.status;
            task.status = newStatus;

            const currentTaskIdInData = this.#boardtasks.findIndex(task => task.id.toString() === preferId);
            this.#boardtasks.splice(currentTaskIdInData, 0, task);

            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);

                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервер:', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async clearBasketTasks() {
        const basketTasks = this.#boardtasks.filter(task => task.status === 'trash');

        try {
            await Promise.all(basketTasks.map(async task => {
                await this.#tasksApiService.deleteTask(task.id)
            }));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
            this._notify(UserAction.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        }
    }
}
