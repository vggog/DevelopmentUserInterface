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


export default class TasksColumnComponent extends AbstractComponent {

    constructor(typeTask,nameTask) {
        super()
        this.typeTask = typeTask;
        this.nameTask = nameTask;
    }

    get template() {
        return tasksColumnComponentTemplate(this.typeTask, this.nameTask);
    }
}