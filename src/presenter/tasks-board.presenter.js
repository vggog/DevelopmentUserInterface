import {render} from '../framework/render.js';
import BoardComponent from "../views/board.component.js";
import TaskItemComponent from "../views/task-item.component.js";
import {status} from "../constants/status.js";
import {statusLabel} from "../constants/status-label.js";
import TasksColumnComponent from "../views/tasks-column.component.js";
import ClearButtonComponent from "../views/clear-button.component.js";
import RawComponent from "../views/raw.component.js";
import LoadingViewControllerComponent from "../views/loading.component.js";


export default class TaskBoardPresenter {
    #tasksBoardComponent=new BoardComponent();

    #boardContainer=null;
    #tasksModel=null;

    get tasks() {
        return this.#tasksModel.tasks;
    }

    constructor (boardContainer, tasksModel) {
        this.#boardContainer=boardContainer;
        this.#tasksModel=tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init(){
        render(this.#tasksBoardComponent, this.#boardContainer);

        const loadingComponent = new LoadingViewControllerComponent();
        render(loadingComponent, this.#tasksBoardComponent.element);

        await this.#tasksModel.init();

        loadingComponent.element.remove();
    }

    async createTask() {
        const taskTitle = document.querySelector('#add-task').value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#add-task').value = "";
        } catch (err) {
            console.error('Ошибка при создании задачи:', err);
        }
    }

    async deleteTrash() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error("Ошибка при очистке корзины:", err)
        }
    }

    #renderTasksList(container) {
        for (let i=0; i < status.length; i++) {
            const taskTableComponent=new TasksColumnComponent({
                typeTask: status[i],
                nameTask: statusLabel[status[i]],
                onTaskDrop: this.#handleTaskDrop.bind(this)});
            render(taskTableComponent,container);

            let filterTaskList=this.tasks.filter(task => task.status === status[i]);
            if (filterTaskList.length === 0) {
                this.#renderRawTask(taskTableComponent.element.querySelector("ul"));
                continue;
            }

            for (let j = 0; j < filterTaskList.length; j++) {
                this.#renderTasks(filterTaskList[j], taskTableComponent.element.querySelector("ul"));
            }

            if(status[i] === "trash") {
                this.#renderClearButton(
                    taskTableComponent.element,
                );
            }
        }
    }

    #renderTasks(task, container) {
        const taskComponent = new TaskItemComponent(task);
        render(taskComponent, container);
    }

    #renderRawTask(container) {
        const rawComponent = new RawComponent();
        render(rawComponent, container);
    }

    #renderClearButton(container, countOfElementsInTrash) {
        const clearButtonComponent = new ClearButtonComponent({
            onClick: () => this.deleteTrash(),
        });
        render(clearButtonComponent, container);
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderTasksList(this.#tasksBoardComponent.element)
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    async #handleTaskDrop({taskId, preferId, newStatus}) {
        try {
            await this.#tasksModel.updateTaskStatus({taskId, preferId, newStatus});
        } catch (err) {
            console.error("Ошибка при обновление статуса задачи:", err)
        }
    }
}
