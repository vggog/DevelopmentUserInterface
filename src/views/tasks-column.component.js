import {createElement} from '../framework/render.js';


function tasksColumnComponentTemplate() {
    return (
        `<div class="backlog-columns">
            <div class="column-header backlog">Бэклог</div>
            <ul class="task-list">
            
            </ul>
        </div>`
    );
}


export default class TasksColumnComponent {
    getTemplate() {
        return tasksColumnComponentTemplate();
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