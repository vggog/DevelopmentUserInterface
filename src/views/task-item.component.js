import {AbstractComponent} from "../framework/view/abstract.component.js";

function taskItemComponentTemplate(task) {
    return (
        `<li class="task-item">${task.title}</li>`
    );
}

export default class TaskItemComponent extends AbstractComponent{

    constructor(task) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return taskItemComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
        });

        this.element.addEventListener('drop', (event) => {
            localStorage.setItem('preferId', this.task.id);
        })
    }
}