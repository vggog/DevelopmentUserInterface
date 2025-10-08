import {createElement} from '../framework/render.js';


function tasksColumnComponentTemplate(typeTask, nameTask) {
    return (
        `<div class="${typeTask}-columns">
            <div class="column-header ${typeTask}">${nameTask}</div>
            <ul class="task-list">
            
            </ul>
        </div>`
    );
}


export default class TasksColumnComponent {

    constructor(typeTask,nameTask) {
        this.typeTask = typeTask;
        this.nameTask = nameTask;
    }

    getTemplate() {
        return tasksColumnComponentTemplate(this.typeTask, this.nameTask);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }


        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}