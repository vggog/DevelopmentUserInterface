import {AbstractComponent} from "../framework/view/abstract.component.js";


function createTaskComponentTemplate() {
    return (
        `<div class="create-task-card">
            <h2>Новая задача</h2>
            <form class="task-form">
                <div class="input-group">
                    <input type="text" id="add-task" class="task-input" placeholder="Название задачи..." required />
                    <button type="submit" class="add-button">
                        Добавить
                    </button>
                </div>
            </form>
        </div>`
    );
}


export default class CreateTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor( {onClick} ) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler)
    }

    get template() {
        return createTaskComponentTemplate();
    }

    #clickHandler = (evn) => {
        evn.preventDefault();
        this.#handleClick();
    }
}
