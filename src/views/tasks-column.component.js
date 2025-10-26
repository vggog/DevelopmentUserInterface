import {AbstractComponent} from "../framework/view/abstract.component.js";


function tasksColumnComponentTemplate(typeTask, nameTask) {
    return (
        `<div class="${typeTask}-columns">
            <div class="column-header ${typeTask}">${nameTask}</div>
            <ul class="task-list">
            
            </ul>
        </div>`
    );
}

const status = ["backlog", "in-progress", "done", "trash"];


export default class TasksColumnComponent extends AbstractComponent {

    def = 5;

    constructor({typeTask, nameTask, onTaskDrop}) {
        super()
        this.typeTask = typeTask;
        this.nameTask = nameTask;

        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return tasksColumnComponentTemplate(this.typeTask, this.nameTask);
    }

    #setDropHandler(onTaskDrop) {

        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();

            onTaskDrop(
                {
                    taskId: event.dataTransfer.getData('text/plain'),
                    preferId: localStorage.getItem('preferId'),
                    newStatus: this.typeTask});
        });
    }
}
