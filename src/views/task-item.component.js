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
    }

    get template() {
        return taskItemComponentTemplate(this.task);
    }
}