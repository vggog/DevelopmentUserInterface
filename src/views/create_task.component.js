import {createElement} from '../framework/render.js';


function createTaskComponentTemplate() {
    return (
        `<div class="create-task-card">
            <h2>Новая задача</h2>
            <form class="task-form">
                <div class="input-group">
                    <input type="text" class="task-input" placeholder="Название задачи..." required />
                    <button type="submit" class="add-button">
                        Добавить
                    </button>
                </div>
            </form>
        </div>`
    );
}


export default class CreateTaskComponent {
    getTemplate() {
        return createTaskComponentTemplate();
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
