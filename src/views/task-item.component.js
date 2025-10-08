import {createElement} from '../framework/render.js';

function taskItemComponentTemplate() {
    return (
        `<li class="task-item">Выучить JS</li>`
    );
}

export default class TaskItemComponent {

    getTemplate() {
        return taskItemComponentTemplate();
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